"""Add activity table

Revision ID: 8a0d24bcddbc
Revises: 1306efa0864e
Create Date: 2021-02-03 09:48:48.611383

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8a0d24bcddbc'
down_revision = '1306efa0864e'
branch_labels = None
depends_on = None


def upgrade():
      op.create_table(
        'activities',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('name', sa.String(50), nullable=False),
        sa.Column('user_id', sa.Integer),
        sa.Column('color', sa.String(50)),
    )


def downgrade():
    op.drop_table('activities')
