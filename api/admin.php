<?php
header('Content-Type: application/json');
require_once '../includes/config.php';
require_once '../includes/contact_handler.php';

$response = ['success' => false, 'message' => '', 'data' => null];

if (!is_authenticated() || !is_admin()) {
    $response['message'] = 'Unauthorized access';
    echo json_encode($response);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $action = isset($_GET['action']) ? $_GET['action'] : '';
    $contactHandler = new ContactHandler($pdo);

    switch ($action) {
        case 'contact_submissions':
            $status = isset($_GET['status']) ? $_GET['status'] : null;
            $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
            $offset = isset($_GET['offset']) ? (int)$_GET['offset'] : 0;

            $submissions = $contactHandler->getContactSubmissions($status, $limit, $offset);
            if ($submissions !== false) {
                $response['success'] = true;
                $response['data'] = $submissions;
            } else {
                $response['message'] = 'Failed to fetch contact submissions';
            }
            break;

        case 'newsletter_subscribers':
            try {
                $stmt = $pdo->prepare(
                    "SELECT * FROM newsletter_subscribers 
                     ORDER BY created_at DESC"
                );
                $stmt->execute();
                $subscribers = $stmt->fetchAll();
                $response['success'] = true;
                $response['data'] = $subscribers;
            } catch(PDOException $e) {
                error_log("Get subscribers error: " . $e->getMessage());
                $response['message'] = 'Failed to fetch subscribers';
            }
            break;

        default:
            $response['message'] = 'Invalid action';
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $action = isset($data['action']) ? $data['action'] : '';

    switch ($action) {
        case 'update_submission_status':
            if (isset($data['submission_id']) && isset($data['status'])) {
                $contactHandler = new ContactHandler($pdo);
                if ($contactHandler->updateSubmissionStatus(
                    $data['submission_id'],
                    $data['status']
                )) {
                    $response['success'] = true;
                    $response['message'] = 'Status updated successfully';
                } else {
                    $response['message'] = 'Failed to update status';
                }
            } else {
                $response['message'] = 'Missing required parameters';
            }
            break;

        case 'update_service':
            if (isset($data['id']) && isset($data['title']) && isset($data['description'])) {
                try {
                    $stmt = $pdo->prepare(
                        "UPDATE services 
                         SET title = ?, description = ?, icon = ?, is_featured = ? 
                         WHERE id = ?"
                    );
                    $stmt->execute([
                        $data['title'],
                        $data['description'],
                        $data['icon'] ?? null,
                        $data['is_featured'] ?? false,
                        $data['id']
                    ]);
                    $response['success'] = true;
                    $response['message'] = 'Service updated successfully';
                } catch(PDOException $e) {
                    error_log("Update service error: " . $e->getMessage());
                    $response['message'] = 'Failed to update service';
                }
            } else {
                $response['message'] = 'Missing required parameters';
            }
            break;

        default:
            $response['message'] = 'Invalid action';
    }
} else {
    $response['message'] = 'Invalid request method';
}

echo json_encode($response);