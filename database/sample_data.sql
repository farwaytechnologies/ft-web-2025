-- Sample data for Farway Technologies website

USE farway_tech;

-- Sample admin user (password: admin123)
INSERT INTO users (username, password, email, role) VALUES
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin@farwaytechnologies.com', 'admin');

-- Sample services
INSERT INTO services (title, description, icon, is_featured) VALUES
('Web Development', 'Custom websites and web applications built with the latest technologies.', 'laptop-code', TRUE),
('Mobile Solutions', 'Native and cross-platform mobile applications.', 'mobile-alt', TRUE),
('Digital Marketing', 'Strategic marketing campaigns to increase brand visibility.', 'chart-line', TRUE),
('IT Consulting', 'Expert advice on technology implementation.', 'cogs', TRUE);

-- Sample projects
INSERT INTO projects (title, description, category, image_url, client_name, completion_date) VALUES
('E-commerce Platform', 'Full-featured online shopping platform with payment integration.', 'Web Development', 'images/portfolio/project1.jpg', 'Tech Innovations', '2023-06-15'),
('Mobile Banking App', 'Secure mobile banking application with biometric authentication.', 'Mobile Development', 'images/portfolio/project2.jpg', 'Global Bank', '2023-08-20'),
('Corporate Website', 'Modern responsive website with CMS integration.', 'Web Design', 'images/portfolio/project3.jpg', 'Corporate Solutions', '2023-09-10'),
('Marketing Campaign', 'Digital marketing strategy and implementation.', 'Marketing', 'images/portfolio/project4.jpg', 'Retail Chain', '2023-10-25');

-- Sample team members
INSERT INTO team_members (name, role, bio, image_url, linkedin_url, twitter_url) VALUES
('John Smith', 'CEO', 'Technology leader with 15 years of experience.', 'images/team/john.jpg', 'https://linkedin.com/in/johnsmith', 'https://twitter.com/johnsmith'),
('Sarah Johnson', 'Lead Developer', 'Full-stack developer specializing in web applications.', 'images/team/sarah.jpg', 'https://linkedin.com/in/sarahjohnson', 'https://twitter.com/sarahj');

-- Sample contact submissions
INSERT INTO contact_submissions (name, email, subject, message, status) VALUES
('Michael Brown', 'michael@example.com', 'Project Inquiry', 'Interested in discussing a potential web development project.', 'new'),
('Lisa Chen', 'lisa@example.com', 'Partnership Opportunity', 'Would like to explore potential partnership opportunities.', 'new');

-- Sample newsletter subscribers
INSERT INTO newsletter_subscribers (email, status) VALUES
('subscriber1@example.com', 'active'),
('subscriber2@example.com', 'active');