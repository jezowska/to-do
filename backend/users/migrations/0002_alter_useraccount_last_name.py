# Generated by Django 4.1.2 on 2022-10-11 17:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='useraccount',
            name='last_name',
            field=models.CharField(max_length=255, null=True),
        ),
    ]