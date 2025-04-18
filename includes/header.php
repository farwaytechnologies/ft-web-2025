<?php
require_once 'config.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo isset($page_title) ? $page_title . ' - Farway Technologies' : 'Farway Technologies'; ?></title>
    <link rel="stylesheet" href="/assets/css/styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
</head>
<body>
    <header>
        <nav class="navbar">
            <div class="logo">
                <a href="/index.php"><img src="/assets/images/logo.png" alt="Farway Technologies"></a>
            </div>
            <ul class="nav-links">
                <li><a href="/index.php" <?php echo ($current_page === 'home') ? 'class="active"' : ''; ?>>Home</a></li>
                <li><a href="/services.php" <?php echo ($current_page === 'services') ? 'class="active"' : ''; ?>>Services</a></li>
                <li><a href="/about.php" <?php echo ($current_page === 'about') ? 'class="active"' : ''; ?>>About</a></li>
                <li><a href="/portfolio.php" <?php echo ($current_page === 'portfolio') ? 'class="active"' : ''; ?>>Portfolio</a></li>
                <li><a href="/contact.php" <?php echo ($current_page === 'contact') ? 'class="active"' : ''; ?>>Contact</a></li>
            </ul>
        </nav>
    </header>