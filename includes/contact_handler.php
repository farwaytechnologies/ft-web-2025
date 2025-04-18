<?php
require_once 'config.php';

class ContactHandler {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function submitContact($name, $email, $subject, $message) {
        try {
            $stmt = $this->pdo->prepare(
                "INSERT INTO contact_submissions (name, email, subject, message) 
                 VALUES (?, ?, ?, ?)"
            );
            return $stmt->execute([$name, $email, $subject, $message]);
        } catch(PDOException $e) {
            error_log("Contact submission error: " . $e->getMessage());
            return false;
        }
    }

    public function subscribeNewsletter($email) {
        try {
            $stmt = $this->pdo->prepare(
                "INSERT INTO newsletter_subscribers (email) 
                 VALUES (?) 
                 ON DUPLICATE KEY UPDATE status = 'active'"
            );
            return $stmt->execute([$email]);
        } catch(PDOException $e) {
            error_log("Newsletter subscription error: " . $e->getMessage());
            return false;
        }
    }

    public function getContactSubmissions($status = null, $limit = 10, $offset = 0) {
        try {
            $sql = "SELECT * FROM contact_submissions";
            $params = [];

            if ($status) {
                $sql .= " WHERE status = ?";
                $params[] = $status;
            }

            $sql .= " ORDER BY created_at DESC LIMIT ? OFFSET ?";
            $params[] = $limit;
            $params[] = $offset;

            $stmt = $this->pdo->prepare($sql);
            $stmt->execute($params);
            return $stmt->fetchAll();
        } catch(PDOException $e) {
            error_log("Get submissions error: " . $e->getMessage());
            return false;
        }
    }

    public function updateSubmissionStatus($submission_id, $status) {
        try {
            $stmt = $this->pdo->prepare(
                "UPDATE contact_submissions 
                 SET status = ? 
                 WHERE id = ?"
            );
            return $stmt->execute([$status, $submission_id]);
        } catch(PDOException $e) {
            error_log("Update submission status error: " . $e->getMessage());
            return false;
        }
    }
}