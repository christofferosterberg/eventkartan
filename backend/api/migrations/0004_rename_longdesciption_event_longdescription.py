# Generated by Django 5.0.2 on 2024-02-25 19:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_company_visitlatitude_company_visitlongitude'),
    ]

    operations = [
        migrations.RenameField(
            model_name='event',
            old_name='longDesciption',
            new_name='longDescription',
        ),
    ]