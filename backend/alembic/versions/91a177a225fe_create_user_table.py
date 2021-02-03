"""create user table

Revision ID: 91a177a225fe
Revises: 
Create Date: 2021-02-02 16:39:35.304856

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '91a177a225fe'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'users',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('name', sa.String(50), nullable=False),
        sa.Column('username', sa.String(50), nullable=False, unique=True),
        sa.Column('password', sa.String(200), nullable=False),
        sa.Column('salt', sa.Binary(), nullable=False),
        sa.Column('is_authenticated', sa.Boolean(), nullable=False, default=False),
    )

def downgrade():
    op.drop_table('users')

