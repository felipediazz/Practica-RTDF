from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models import CheckConstraint, Q, F

# Create your models here.
##FALTA CREAR TABLAS DE
###PROVINCIA-REGION(se relacionan con comuna) Y 6 TABLAS DE PACIENTE

#CHOISE RESPUESTAS_forms
RESPUESTAS_CHOICES_GRBAS = (('0', 'Normal'),('1', 'Alteración Ligera'),('2', 'Alteración Moderada'),('3', 'Alteración Severa'))

RESPUESTAS_CHOICES_RASATI = (('0', 'Normal'),('1', 'Leve'),('2', 'Moderado'),('3', 'Severo'))

RESPUESTAS_CHOICES_ESV = (('0','Nunca'), ('1','Casi nunca'), ('2','A veces'), ('3','Casi siempre'), ('4','Siempre'))

#TipoUsuario
class TipoUsuario(models.Model):
        id= models.CharField(primary_key=True, max_length=3)
        nombre_tipo_usuario = models.CharField(max_length=100)
        descripcion = models.CharField(max_length=100)
        def __str__(self):
            return str(self.nombre_tipo_usuario)


# # REGION
class Region(models.Model):
       id_region = models.BigAutoField(primary_key=True)
       nombre_region = models.CharField(max_length=100)
       def __str__(self):
           return str(self.nombre_region)

# # #Provincia
class Provincia(models.Model):
       id_provincia = models.BigAutoField(primary_key=True)
       nombre_provincia = models.CharField(max_length=100)
       id_region = models.ForeignKey(Region, on_delete=models.CASCADE,null=True)
       def __str__(self):
           return str(self.nombre_provincia)



# # #COMUNA
class Comuna(models.Model):
       id_comuna = models.BigAutoField(primary_key=True)
       nombre_comuna = models.CharField(max_length=100)
       id_provincia = models.ForeignKey(Provincia, on_delete=models.CASCADE,null=True)
       def __str__(self):
           return str(self.nombre_comuna)


class PreRegistro(models.Model):
        rut = models.CharField(max_length=100)
        nombre = models.CharField(max_length=100)
        apellido = models.CharField(max_length=100)
        tipo_user = models.CharField(max_length=100, null=True)
        email = models.CharField(max_length=100)
        telefono = models.CharField(max_length=100)
        def __str__(self):
            return str(self.rut)


#  #
class Tipoaudio(models.Model):
        nombre_tipo_usuario = models.CharField(max_length=100)
        descripcion = models.CharField(max_length=100)
        def __str__(self):
            return str(self.nombre_tipo_usuario)





# # #Institucion
class Institucion(models.Model):
       id_institucion = models.BigAutoField(primary_key=True)
       nombre_institucion = models.CharField(max_length=100)
       descripcion = models.CharField(max_length=100)
       comuna = models.ForeignKey(Comuna, on_delete=models.CASCADE,null=True)
       def __str__(self):
           return str(self.nombre_institucion)



# # # #USUARIO
class Usuario(AbstractUser):
       # username = models.CharField(unique=True, max_length=150)
       # password = models.CharField(max_length=128)
       rut =  models.CharField(max_length=100)
       id_tipo_user = models.ForeignKey(TipoUsuario, on_delete=models.SET_NULL,null=True)
       comuna = models.ForeignKey(Comuna, on_delete=models.SET_NULL,null=True)

       def rutt(self):
           return str(self.rut)

       def __str__(self):
           return str(self.id) + " " + str(self.username)




##   diabetes
class Diabetes(models.Model):
    id = models.BigAutoField(primary_key=True)
    tipo_diabetes = models.CharField(max_length=45)
    def __str__(self):
         return str(self.tipo_diabetes)

##   hipertension
class Hipertension(models.Model):
    id = models.BigAutoField(primary_key=True)
    estado_hipertension = models.CharField(max_length=45)
    def __str__(self):
         return str(self.estado_hipertension)

# # # # #PACIENTE
class Paciente(models.Model):
       idPaciente = models.BigAutoField(primary_key=True)
       #rut_paciente =  models.CharField(max_length=100)
       telegram_paciente = models.CharField(max_length=100)
       diabetes = models.ForeignKey(Diabetes, on_delete=models.CASCADE,null=True)
       hipertencion = models.ForeignKey(Hipertension, on_delete=models.CASCADE,null=True)
       Observacion = models.CharField(max_length=100)
       id_usuario = models.ForeignKey(Usuario,on_delete=models.CASCADE, related_name='relacion_tipouser', null=True, limit_choices_to={'id_tipo_user':3})
       def __str__(self):
           return str(self.id_usuario)

  #  models.ForeignKey(  Usuario,  related_name='relacion_rut', to_field="rut" ,on_delete=models.CASCADE,null=True, unique=True)
# #FAMILIAR
class Familiar(models.Model):
     id_familiar = models.BigAutoField(primary_key=True)
     rut_familiar = models.CharField(max_length=100)
     id_usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE,null=True)
     def __str__(self):
         return str(self.rut_familiar)



# #FAMILIAR_PACIENTE
class Familiar_paciente(models.Model):
     id_fam_pac = models.BigAutoField(primary_key=True)
     id_familiar = models.ForeignKey(Familiar, on_delete=models.CASCADE,null=True)
     id_paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE,null=True)
     parentesco  = models.CharField(max_length=100)
     def __str__(self):
         return str(self.parentesco)


# #PROFESIONAL SALUD
class Profesional_salud(models.Model):
     id_profesional = models.BigAutoField(primary_key=True)
     rut_profesional = models.CharField(max_length=100)
    #  id_profesional_salud= models.ForeignKey(Usuario, on_delete=models.CASCADE, null=True)
     tipo_profesional = models.ForeignKey(TipoUsuario, on_delete=models.CASCADE,null=True)
     institucion_id = models.ForeignKey(Institucion, on_delete=models.CASCADE,null=True)
     def __str__(self):
        return str(self.rut_profesional)






# #PROFESIONAL PACIENTE
class Profesional_Paciente(models.Model):
     id_prof_paci = models.BigAutoField(primary_key=True)
     descripcion = models.CharField(max_length=100)
     id_profesional_salud = models.ForeignKey(Usuario, on_delete=models.CASCADE,null=True, related_name="Rmedico",limit_choices_to=Q(id_tipo_user_id=2)| Q(id_tipo_user_id=6))
     id_paciente = models.ForeignKey(Usuario, on_delete=models.CASCADE,null=True, related_name="Rpaciente",limit_choices_to=Q(id_tipo_user_id=3))
     tipo_profesional = models.ForeignKey(TipoUsuario, on_delete=models.CASCADE,null=True)
     def __str__(self):
         return str(self.id_paciente)



# # AUDIO
class Audio(models.Model):
     id_audio = models.BigAutoField(primary_key=True)
     url_audio = models.FileField(upload_to='media')
     timestamp = models.CharField(max_length=100)
     idusuario = models.ForeignKey(Usuario, on_delete=models.CASCADE,null=True)
     def __str__(self):
         return str(self.url_audio)




# # PARAMETRO
class Parametros(models.Model):
     tiempoVocalizacion = models.CharField(max_length=100)
     tiempoIntensidad = models.CharField(max_length=100)
     Descripcion = models.CharField(max_length=100)
     def __str__(self):
         return str(self.tiempoVocalizacion)






# #FONOAUDILOGO
class Fonoaudilogos(models.Model):
     rut = models.CharField(max_length=100)
     NombreCompleto = models.CharField(max_length=100)
     Registro = models.CharField(max_length=100)
     RegionLaboral = models.CharField(max_length=100)
     TituloProfesional = models.CharField(max_length=100)
     preregistrado = models.CharField(max_length=100)
     def __str__(self):
         return str(self.rut)



##app_documento
class App_documento(models.Model):
    id_documento = models.BigAutoField(primary_key=True)
    titulo = models.CharField(max_length=1000)
    documento = models.CharField(max_length=100)
    descripcion = models.CharField(max_length=1000)
    qr = models.CharField(max_length=100)
    def __str__(self):
         return str(self.documento)

##   paciente_Documento ->
class paciente_documento(models.Model):
     id_paciente_documento = models.BigAutoField(primary_key=True)
     autorizado = models.CharField(max_length=100)
     documento_id = models.ForeignKey(App_documento, on_delete=models.CASCADE,null=True)
     paciente_id_paciente = models.ForeignKey(Usuario, on_delete=models.CASCADE,null=True)
     def __str__(self):
          return str(self.autorizado)

##   Intensidad
class Intensidad(models.Model):
     id = models.BigAutoField(primary_key=True)
     timestamp = models.CharField(max_length=100)
     url_audio = models.FileField(upload_to='media')
     intensidad = models.CharField(max_length=100)
     mindb = models.CharField(max_length=100)
     maxdb = models.CharField(max_length=100)
     comentario = models.CharField(max_length=100)
     paciente_id_paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE,null=True)
     def __str__(self):
         return str(self.id)

## vocalizacion
class Vocalizacion(models.Model):
     id = models.BigAutoField(primary_key=True)
     timestamp = models.CharField(max_length=100)
     url_audio = models.FileField(upload_to='media')
     duracion = models.CharField(max_length=100)
     bpminute = models.CharField(max_length=100)
     bpmeasure = models.CharField(max_length=100)
     comentario = models.CharField(max_length=100)
     paciente_id_paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE,null=True)
     def __str__(self):
         return str(self.id)




class AudiosCoeficientes(models.Model):
    idusuario= models.ForeignKey(Usuario, on_delete=models.CASCADE,null=True)
    nombre_archivo = models.CharField(max_length=100)
    timestamp = models.CharField(max_length=100)
    F0  = models.CharField(max_length=100)
    F1  = models.CharField(max_length=100)
    F2  = models.CharField(max_length=100)
    F3  = models.CharField(max_length=100)
    F4  = models.CharField(max_length=100)
    Intensidad  = models.CharField(max_length=100)
    HNR  = models.CharField(max_length=100)
    Local_Jitter  = models.CharField(max_length=100)
    Local_Absolute_Jitter  = models.CharField(max_length=100)
    Rap_Jitter  = models.CharField(max_length=100)
    ppq5_Jitter  = models.CharField(max_length=100)
    ddp_Jitter = models.CharField(max_length=100)
    Local_Shimmer = models.CharField(max_length=100)
    Local_db_Shimmer = models.CharField(max_length=100)
    apq3_Shimmer = models.CharField(max_length=100)
    aqpq5_Shimmer = models.CharField(max_length=100)
    apq11_Shimmer = models.CharField(max_length=100)
    def __str__(self):
        return str(self.id)

class AudiosCoeficientes_Fono(models.Model):
    idusuario= models.ForeignKey(Usuario, on_delete=models.CASCADE,null=True)
    nombre_archivo = models.CharField(max_length=100)
    timestamp = models.CharField(max_length=100)
    F0  = models.CharField(max_length=100)
    F1  = models.CharField(max_length=100)
    F2  = models.CharField(max_length=100)
    F3  = models.CharField(max_length=100)
    F4  = models.CharField(max_length=100)
    Intensidad  = models.CharField(max_length=100)
    HNR  = models.CharField(max_length=100)
    Local_Jitter  = models.CharField(max_length=100)
    Local_Absolute_Jitter  = models.CharField(max_length=100)
    Rap_Jitter  = models.CharField(max_length=100)
    ppq5_Jitter  = models.CharField(max_length=100)
    ddp_Jitter = models.CharField(max_length=100)
    Local_Shimmer = models.CharField(max_length=100)
    Local_db_Shimmer = models.CharField(max_length=100)
    apq3_Shimmer = models.CharField(max_length=100)
    aqpq5_Shimmer = models.CharField(max_length=100)
    apq11_Shimmer = models.CharField(max_length=100)
    def __str__(self):
        return str(self.id)



##   GRBAS
class Grbas(models.Model):
    id = models.BigAutoField(primary_key=True)
    id_fonoaudilogo = models.CharField(max_length=100)
    id_paciente = models.CharField(max_length=100)
    timestamp = models.CharField(max_length=100)
    # RESPUESTAS_CHOICES = (('0', '0'), ('1', '1'), ('2', '2'), ('3', '3'))
    G = models.CharField(max_length=1, choices=RESPUESTAS_CHOICES_GRBAS)
    R = models.CharField(max_length=1, choices=RESPUESTAS_CHOICES_GRBAS)
    B = models.CharField(max_length=1, choices=RESPUESTAS_CHOICES_GRBAS)
    A = models.CharField(max_length=1, choices=RESPUESTAS_CHOICES_GRBAS)
    S = models.CharField(max_length=1, choices=RESPUESTAS_CHOICES_GRBAS)
    Comentario = models.CharField(max_length=100)

    def __str__(self):
        return str(self.id)



##   RASATI
class Rasati(models.Model):
     id = models.BigAutoField(primary_key=True)
     id_fonoaudilogo = models.CharField(max_length=100)
     id_paciente =  models.CharField(max_length=100)
     timestamp = models.CharField(max_length=100)
    #  RESPUESTAS_CHOICES = [('SI', 'SI'), ('NO', 'NO')]
    ##RONQUIDO 'id_fonoaudilogo','id_paciente','timestamp','Ronquera','Aspereza','Soplo','Astenia','Tension','Inestabilidad','Comentario'
     R = models.CharField(max_length=2, choices=RESPUESTAS_CHOICES_RASATI)
     ##ASPEREZA
     A1 = models.CharField(max_length=2, choices=RESPUESTAS_CHOICES_RASATI)
     ##SOPLO
     S = models.CharField(max_length=2, choices=RESPUESTAS_CHOICES_RASATI)
     ##ASTENIA
     A2 = models.CharField(max_length=2, choices=RESPUESTAS_CHOICES_RASATI)
     ##TENSION
     T = models.CharField(max_length=2, choices=RESPUESTAS_CHOICES_RASATI)
     ##INESTABILIDAD
     I = models.CharField(max_length=2, choices=RESPUESTAS_CHOICES_RASATI)
     Comentario = models.CharField(max_length=100)
     
     def __str__(self):
         return str(self.id)
    
class EBC(models.Model):
    id= models.BigAutoField(primary_key=True) #ID table
    id_paciente =  models.CharField(max_length=100) #ID Paciente
    id_fonoaudiologo= models.CharField(max_length=100) #ID Fonoaudiologo
    timestamp = models.DateTimeField(auto_now_add=True) #ACTUAL timestamp
    pac_analfabeto =models.BooleanField(default=False, null=False) #Paciente analfabeto?
    part1p1 = models.BooleanField(default=False, null=False)
    part1p2 = models.BooleanField(default=False, null=False)
    part1p3 = models.BooleanField(default=False, null=False)
    part1p4 = models.BooleanField(default=False, null=False)
    part1p5 = models.BooleanField(default=False, null=False)
    part1p6 = models.BooleanField(default=False, null=False)
    part1p7 = models.BooleanField(default=False, null=False)
    part1p8 = models.BooleanField(default=False, null=False)
    part1p9 = models.BooleanField(default=False, null=False)
    part1p10 = models.BooleanField(default=False, null=False)
    part1p11 = models.BooleanField(default=False, null=False)
    part1p12 = models.BooleanField(default=False, null=False)
    part1p13 = models.BooleanField(default=False, null=False)
    part1p14 = models.BooleanField(default=False, null=False)
    part1p15 = models.BooleanField(default=False, null=False)
    part1p16 = models.BooleanField(default=False, null=False)
    part1p17 = models.BooleanField(default=False, null=False)
    part1p18 = models.BooleanField(default=False, null=False)
    part1p19 = models.BooleanField(default=False, null=False)
    actComun = models.CharField(max_length=50, null=False)
    part2p1 = models.CharField(max_length=2, null=True)
    part2p2 = models.CharField(max_length=10, null=True)
    part2p3 = models.CharField(max_length=6, null=True)
    part2p4 = models.CharField(max_length=25, null=True)
    opcfunconver1 = models.CharField(max_length=50, null=True)
    part2p5 = models.CharField(max_length=15, null=True)
    part2p6 = models.CharField(max_length=250, null=True)
    part2p7 = models.CharField(max_length=2, null=True)
    part2p8 = models.CharField(max_length=10, null=True)
    part2p9 = models.CharField(max_length=6, null=True)
    part2p10 = models.CharField(max_length=25, null=True)
    opcfunconver2 = models.CharField(max_length=50, null=True)
    part2p11 = models.CharField(max_length=15, null=True)
    part2p12 = models.CharField(max_length=250, null=True)
    part2p13 = models.CharField(max_length=2, null=True)
    part2p14 = models.CharField(max_length=10, null=True)
    part2p15 = models.CharField(max_length=6, null=True)
    part2p16 = models.CharField(max_length=25, null=True)
    opcfunconver3 = models.CharField(max_length=50, null=True)
    part2p17 = models.CharField(max_length=15, null=True)
    part2p18 = models.CharField(max_length=250, null=True)
    part2p19 = models.CharField(max_length=2, null=True)
    part2p20 = models.CharField(max_length=10, null=True)
    part2p21 = models.CharField(max_length=6, null=True)
    part2p22 = models.CharField(max_length=25, null=True)
    opcfunconver4 = models.CharField(max_length=50, null=True)
    part2p23 = models.CharField(max_length=15, null=True)
    part2p24 = models.CharField(max_length=250, null=True)
    part3p1 = models.BooleanField(default=False, null=False)
    part3p2 = models.BooleanField(default=False, null=False)
    part3p3 = models.BooleanField(default=False, null=False)
    part3p4 = models.BooleanField(default=False, null=False)
    part3p5 = models.BooleanField(default=False, null=False)
    part3p6 = models.BooleanField(default=False, null=False)
    part3p7 = models.BooleanField(default=False, null=False)
    part3p8 = models.BooleanField(default=False, null=False)
    part3p9 = models.BooleanField(default=False, null=False)
    part3p10 = models.BooleanField(default=False, null=False)
    part3p11 = models.BooleanField(default=False, null=False)
    part3p12 = models.BooleanField(default=False, null=False)
    part3p13 = models.BooleanField(default=False, null=False)
    part3p14 = models.BooleanField(default=False, null=False)
    part3p15 = models.BooleanField(default=False, null=False)
    part3p16 = models.BooleanField(default=False, null=False)
    part3p17 = models.BooleanField(default=False, null=False)
    part3p18 = models.BooleanField(default=False, null=False)
    part3p19 = models.BooleanField(default=False, null=False)
    part3p20 = models.BooleanField(default=False, null=False)
    part3Punt= models.CharField(max_length=50, null=False)
      
    def __str__(self):
        return str(self.id)

class Esv(models.Model):
    id = models.BigAutoField(primary_key=True)
    id_paciente =  models.CharField(max_length=100)
    id_fonoaudiologo= models.CharField(max_length=100)
    
    timestamp = models.DateTimeField(auto_now_add=True)
    p1=models.CharField(max_length=1, choices=RESPUESTAS_CHOICES_ESV)
    p2=models.CharField(max_length=1, choices=RESPUESTAS_CHOICES_ESV)
    p3=models.CharField(max_length=1, choices=RESPUESTAS_CHOICES_ESV)
    p4=models.CharField(max_length=1, choices=RESPUESTAS_CHOICES_ESV)
    p5=models.CharField(max_length=1, choices=RESPUESTAS_CHOICES_ESV)
    p6=models.CharField(max_length=1, choices=RESPUESTAS_CHOICES_ESV)
    p7=models.CharField(max_length=1, choices=RESPUESTAS_CHOICES_ESV)
    p8=models.CharField(max_length=1, choices=RESPUESTAS_CHOICES_ESV)
    p9=models.CharField(max_length=1, choices=RESPUESTAS_CHOICES_ESV)
    p10=models.CharField(max_length=1, choices=RESPUESTAS_CHOICES_ESV)
    p11=models.CharField(max_length=1, choices=RESPUESTAS_CHOICES_ESV)
    p12=models.CharField(max_length=1, choices=RESPUESTAS_CHOICES_ESV)
    p13=models.CharField(max_length=1, choices=RESPUESTAS_CHOICES_ESV)
    p14=models.CharField(max_length=1, choices=RESPUESTAS_CHOICES_ESV)
    p15=models.CharField(max_length=1, choices=RESPUESTAS_CHOICES_ESV)
    p16=models.CharField(max_length=1, choices=RESPUESTAS_CHOICES_ESV)
    p17=models.CharField(max_length=1, choices=RESPUESTAS_CHOICES_ESV)
    p18=models.CharField(max_length=1, choices=RESPUESTAS_CHOICES_ESV)
    p19=models.CharField(max_length=1, choices=RESPUESTAS_CHOICES_ESV)
    p20=models.CharField(max_length=1, choices=RESPUESTAS_CHOICES_ESV)
    p21=models.CharField(max_length=1, choices=RESPUESTAS_CHOICES_ESV)
    p22=models.CharField(max_length=1, choices=RESPUESTAS_CHOICES_ESV)
    p23=models.CharField(max_length=1, choices=RESPUESTAS_CHOICES_ESV)
    p24=models.CharField(max_length=1, choices=RESPUESTAS_CHOICES_ESV)
    p25=models.CharField(max_length=1, choices=RESPUESTAS_CHOICES_ESV)
    p26=models.CharField(max_length=1, choices=RESPUESTAS_CHOICES_ESV)
    p27=models.CharField(max_length=1, choices=RESPUESTAS_CHOICES_ESV)
    p28=models.CharField(max_length=1, choices=RESPUESTAS_CHOICES_ESV)
    p29=models.CharField(max_length=1, choices=RESPUESTAS_CHOICES_ESV)
    p30=models.CharField(max_length=1, choices=RESPUESTAS_CHOICES_ESV)
    totalESV= models.CharField(max_length=3, null= False )
    limitacion=models.CharField(max_length=2, null= False)
    emocional=models.CharField(max_length=2, null= False)
    fisico=models.CharField(max_length=2, null= False)
    def __str__(self):
        return str(self.id)



























# # MEMORICE O MEMORAMA


# class Memorice(models.Model):
#     acierto = models.CharField(max_length=200)
#     tiempo = models.CharField(max_length=100)
#     movimientos = models.CharField(max_length=100)
#     usuario = models.ForeignKey(User, on_delete=models.CASCADE)
#     timestamp = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return str(self.usuario)

# # EJERCICIO PALABRAS


# class VocalPalabras(models.Model):
#     usuario = models.ForeignKey(User, on_delete=models.CASCADE)
#     timestamp = models.DateTimeField(auto_now_add=True)
#     audio = models.FileField(upload_to='archivos_media')

#     def __str__(self):
#         return str(self.usuario)

# # EJERCICIO LECTURA


# class VocalTexto(models.Model):
#     usuario = models.ForeignKey(User, on_delete=models.CASCADE)
#     timestamp = models.DateTimeField(auto_now_add=True)
#     audio = models.FileField(upload_to='archivos_media')

#     def __str__(self):
#         return str(self.usuario)



#class AppMedia(models.Model):
#    id = models.BigAutoField(primary_key=True)
#    audio = models.CharField(max_length=100)
#    timestamp = models.CharField(max_length=100)
#    idpaciente = models.CharField(db_column='idPaciente', max_length=100)  # Field name made lowercase.
#
#    class Meta:
#        managed = False
#        db_table = 'app_media'






