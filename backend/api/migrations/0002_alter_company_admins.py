# Generated by Django 5.0.2 on 2024-02-25 15:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='company',
            name='admins',
            field=models.ManyToManyField(related_name='companies', to='api.emailaddress'),
        ),
    ]
