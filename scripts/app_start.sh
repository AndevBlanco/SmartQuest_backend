cd /home/ubuntu/SmartQuest_backend
pm2 start npm --name "sq.backend" -- start
pm2 startup
pm2 save
pm2 restart all