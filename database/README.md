# Database Setup Instructions

## Prerequisites
- MySQL Server 5.7 or higher
- phpMyAdmin (included with XAMPP) or MySQL command-line client

## Setup Steps

1. Open phpMyAdmin or MySQL command-line client
2. Create the database and tables by executing `schema.sql`
3. Import sample data (optional) by executing `sample_data.sql`

## Database Structure

### Tables
- `users`: Authentication and user management
- `contact_submissions`: Contact form entries
- `newsletter_subscribers`: Email newsletter subscriptions
- `projects`: Portfolio project entries
- `services`: Company services
- `team_members`: Team member profiles

## Backup and Maintenance
- Regular backups recommended
- Use mysqldump for backup: `mysqldump -u root -p farway_tech > backup.sql`
- Monitor database size and performance

## Security Notes
- Keep database credentials secure
- Regular security updates
- Use prepared statements for queries
- Implement proper access controls