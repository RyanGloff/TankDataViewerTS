export PGPASSWORD="docker"
export FILENAME="/mnt/nas/postgres_backups/backup_$(date +\%F).sql"

pg_dump -U postgres -h localhost --schema tank_data_schema --data-only -d tank_data > $FILENAME
