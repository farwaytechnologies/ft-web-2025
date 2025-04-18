<?php
header('Content-Type: application/json');
require_once '../includes/config.php';
require_once '../includes/contact_handler.php';

$response = ['success' => false, 'message' => ''];
$contactHandler = new ContactHandler($pdo);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (isset($data['type']) && $data['type'] === 'newsletter') {
        // Handle newsletter subscription
        if (isset($data['email']) && filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            $email = sanitize_input($data['email']);
            if ($contactHandler->subscribeNewsletter($email)) {
                $response['success'] = true;
                $response['message'] = 'Successfully subscribed to newsletter!';
            } else {
                $response['message'] = 'Subscription failed. Please try again.';
            }
        } else {
            $response['message'] = 'Invalid email address.';
        }
    } else {
        // Handle contact form submission
        $required_fields = ['name', 'email', 'subject', 'message'];
        $missing_fields = array_filter($required_fields, function($field) use ($data) {
            return !isset($data[$field]) || empty(trim($data[$field]));
        });

        if (empty($missing_fields)) {
            $name = sanitize_input($data['name']);
            $email = sanitize_input($data['email']);
            $subject = sanitize_input($data['subject']);
            $message = sanitize_input($data['message']);

            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $response['message'] = 'Invalid email address.';
            } else if ($contactHandler->submitContact($name, $email, $subject, $message)) {
                $response['success'] = true;
                $response['message'] = 'Thank you for your message. We will get back to you soon!';
            } else {
                $response['message'] = 'Message submission failed. Please try again.';
            }
        } else {
            $response['message'] = 'Please fill in all required fields.';
        }
    }
} else {
    $response['message'] = 'Invalid request method.';
}

echo json_encode($response);