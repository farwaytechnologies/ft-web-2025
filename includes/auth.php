<?php
require_once 'config.php';

class Auth {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function login($username, $password) {
        try {
            $stmt = $this->pdo->prepare("SELECT id, username, password, role FROM users WHERE username = ?");
            $stmt->execute([$username]);
            $user = $stmt->fetch();

            if ($user && password_verify($password, $user['password'])) {
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['username'] = $user['username'];
                $_SESSION['user_role'] = $user['role'];
                return true;
            }
            return false;
        } catch(PDOException $e) {
            error_log("Login error: " . $e->getMessage());
            return false;
        }
    }

    public function register($username, $email, $password, $role = 'editor') {
        try {
            $stmt = $this->pdo->prepare("INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)");
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);
            $stmt->execute([$username, $email, $hashed_password, $role]);
            return true;
        } catch(PDOException $e) {
            error_log("Registration error: " . $e->getMessage());
            return false;
        }
    }

    public function logout() {
        session_unset();
        session_destroy();
        return true;
    }

    public function changePassword($user_id, $old_password, $new_password) {
        try {
            $stmt = $this->pdo->prepare("SELECT password FROM users WHERE id = ?");
            $stmt->execute([$user_id]);
            $user = $stmt->fetch();

            if ($user && password_verify($old_password, $user['password'])) {
                $stmt = $this->pdo->prepare("UPDATE users SET password = ? WHERE id = ?");
                $hashed_password = password_hash($new_password, PASSWORD_DEFAULT);
                $stmt->execute([$hashed_password, $user_id]);
                return true;
            }
            return false;
        } catch(PDOException $e) {
            error_log("Password change error: " . $e->getMessage());
            return false;
        }
    }

    public function getUserById($user_id) {
        try {
            $stmt = $this->pdo->prepare("SELECT id, username, email, role FROM users WHERE id = ?");
            $stmt->execute([$user_id]);
            return $stmt->fetch();
        } catch(PDOException $e) {
            error_log("Get user error: " . $e->getMessage());
            return false;
        }
    }
}