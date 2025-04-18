<?php
require_once 'db.php';
?>
<footer>
    <div class="footer-container">
        <div class="footer-content">
            <div class="footer-about">
                <h3>Farway Technologies</h3>
                <p>Innovative solutions for the digital age</p>
            </div>
            <div class="footer-links">
                <h3>Quick Links</h3>
                <ul>
                    <li><a href="/index.php">Home</a></li>
                    <li><a href="/services.php">Services</a></li>
                    <li><a href="/about.php">About</a></li>
                    <li><a href="/portfolio.php">Portfolio</a></li>
                    <li><a href="/contact.php">Contact</a></li>
                </ul>
            </div>
            <div class="footer-newsletter">
                <h3>Newsletter</h3>
                <p>Subscribe to our newsletter for updates</p>
                <form action="/api/newsletter.php" method="post" id="newsletter-form">
                    <input type="email" name="email" placeholder="Your Email" required>
                    <button type="submit"><i class="fas fa-paper-plane"></i></button>
                </form>
                <div id="newsletter-message"></div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; <?php echo date('Y'); ?> Farway Technologies. All Rights Reserved.</p>
        </div>
    </div>
</footer>

<!-- JavaScript -->
<script src="/assets/js/main.js"></script>
<?php if (isset($page_scripts)) { foreach($page_scripts as $script) { ?>
<script src="<?php echo $script; ?>"></script>
<?php }} ?>
</body>
</html>