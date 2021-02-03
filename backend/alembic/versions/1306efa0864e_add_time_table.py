"""Add time table

Revision ID: 1306efa0864e
Revises: 91a177a225fe
Create Date: 2021-02-03 09:46:04.256461

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "1306efa0864e"
down_revision = "91a177a225fe"
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "times",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("name", sa.String(50), nullable=False),
        sa.Column("activity_id", sa.Integer, default=None),
        sa.Column("user_id", sa.Integer),
    )


def downgrade():
    op.drop_table("times")
