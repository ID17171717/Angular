import sys
import os

# Добавляем путь к infrastructure/db
sys.path.append(os.path.join(os.path.dirname(__file__), 'infrastructure', 'db'))

import mysql_local
from mysql_local import get_admins