<?php
header('Content-Type: application/json');
require_once '../includes/config.php';
require_once '../includes/auth.php';

$response = ['success' => false, 'message' => '', 'data' => null];
$auth = new Auth($pdo);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $action = isset($data['action']) ? $data['action'] : '';

    switch ($action) {
        case 'login':
            if (isset($data['username']) && isset($data['password'])) {
                $username = sanitize_input($data['username']);
                $password = $data['password'];

                if ($auth->login($username, $password)) {
                    $response['success'] = true;
                    $response['message'] = 'Login successful';
                    $response['data'] = [
                        'username' => $_SESSION['username'],
                        'role' => $_SESSION['user_role']
                    ];
                } else {
                    $response['message'] = 'Invalid username or password';
                }
            } else {
                $response['message'] = 'Username and password are required';
            }
            break;

        case 'logout':
            if ($auth->logout()) {
                $response['success'] = true;
                $response['message'] = 'Logout successful';
            } else {
                $response['message'] = 'Logout failed';
            }
            break;

        case 'check_auth':
            if (is_authenticated()) {
                $response['success'] = true;
                $response['data'] = [
                    'authenticated' => true,
                    'username' => $_SESSION['username'],
                    'role' => $_SESSION['user_role']
                ];
            } else {
                $response['data'] = ['authenticated' => false];
            }
            break;

        case 'change_password':
            if (!is_authenticated()) {
                $response['message'] = 'Authentication required';
                break;
            }

            if (isset($data['old_password']) && isset($data['new_password'])) {
                if ($auth->changePassword(
                    $_SESSION['user_id'],
                    $data['old_password'],
                    $data['new_password']
                )) {
                    $response['success'] = true;
                    $response['message'] = 'Password changed successfully';
                } else {
                    $response['message'] = 'Password change failed';
                }
            } else {
                $response['message'] = 'Old and new passwords are required';
            }
            break;

        default:
            $response['message'] = 'Invalid action';
    }
} else {
    $response['message'] = 'Invalid request method';
}

echo json_encode($response);