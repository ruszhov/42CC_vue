from django.contrib import admin
from apps.hello.models import Contact, HttpRequestLog, ModelActionLog


class ContactAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Contact._meta.fields]

    class Meta:
        model = Contact


class HttpRequestLogAdmin(admin.ModelAdmin):
    list_display = [field.name for field in HttpRequestLog._meta.fields]

    class Meta:
        model = HttpRequestLog


class ModelActionLogAdmin(admin.ModelAdmin):
    list_display = [field.name for field in ModelActionLog._meta.fields]

    class Meta:
        model = ModelActionLog


admin.site.register(HttpRequestLog, HttpRequestLogAdmin)
admin.site.register(ModelActionLog, ModelActionLogAdmin)
admin.site.register(Contact, ContactAdmin)
