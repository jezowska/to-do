# Generated by Django 4.1.2 on 2022-10-11 17:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_alter_useraccount_last_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='useraccount',
            name='last_name',
        ),
    ]
