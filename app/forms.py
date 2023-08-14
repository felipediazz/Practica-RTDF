from django import forms
from .models import *
from django.contrib.auth.forms import UserCreationForm


class CustomUserCreationForm(UserCreationForm):

    class Meta(UserCreationForm.Meta):
        model = Usuario
        fields =  ('email','username', 'first_name', 'last_name', 'id_tipo_user', 'password1', 'password2','rut')







class PreRegistroFrom(forms.ModelForm):
    class Meta():
        model = PreRegistro
        fields = ('rut','nombre', 'apellido'  , 'email', 'telefono','tipo_user')

class GrbasFrom(forms.ModelForm):
    class Meta:
        model = Grbas
        fields = ['id_fonoaudilogo', 'id_paciente', 'timestamp', 'G', 'R', 'B', 'A', 'S', 'Comentario']

class EBCForm(forms.ModelForm):
    class Meta:
        model = EBC
        fields  = '__all__'
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field_name in ['part2p1', 'part2p2', 'part2p3', 'part2p4', 'part2p5', 'part2p6', 'part2p7', 'part2p8', 'part2p9', 'part2p10', 'part2p11', 'part2p12', 'part2p13', 'part2p14', 'part2p15', 'part2p16', 'part2p17', 'part2p18', 'part2p19', 'part2p20', 'part2p21','part2p22', 'part2p23','part2p24','opcfunconver1','opcfunconver2','opcfunconver3','opcfunconver4']:
            if field_name in self.fields:
                self.fields[field_name].required = False


class RasatiFrom(forms.ModelForm):
    timestamp= models.DateTimeField(auto_now_add=True)
    class Meta():
        model = Rasati 
        fields = ('id_fonoaudilogo','id_paciente','timestamp','R','A1','S','A2','T','I','Comentario')

class CoeficientesForm(forms.ModelForm):
    class Meta():
        model = AudiosCoeficientes_Fono
        fields= ("idusuario","nombre_archivo", "timestamp","Intensidad","F0","F1","F2","F3","F4","Intensidad","HNR","Local_Jitter","Local_Absolute_Jitter","Rap_Jitter","ppq5_Jitter","ddp_Jitter","Local_Shimmer","Local_db_Shimmer","apq3_Shimmer","aqpq5_Shimmer","apq11_Shimmer")

class EvaSinVocForm(forms.ModelForm):
    class Meta():
        model = Esv
        fields= '__all__'

# class MemoriceForm(forms.ModelForm):
#     acierto = forms.CharField(label='Cantidad de aciertos', widget=forms.TextInput(
#         attrs={

#             'placeholder': 'Ingresa cantidad de aciertos',
#             'id': 'total_acierto'
#         }))

#     tiempo = forms.CharField(label='Cantidad de tiempo', widget=forms.TextInput(
#         attrs={

#             'placeholder': 'Ingresa cantidad de tiempo',
#             'id': 'total_tiempo'
#         }))

#     movimientos = forms.CharField(label='Cantidad de movimientos', widget=forms.TextInput(
#         attrs={

#             'placeholder': 'Ingresa cantidad de movimientos',
#             'id': 'total_movimientos'
#         }))

#     class Meta:
#         model = Memorice
#         fields = 'acierto', 'tiempo', 'movimientos'

# # EJERCICIO PALABRAS


# class VocalPalabras(forms.ModelForm):
#     class Meta:
#         model = VocalPalabras
#         fields = '__all__'

# # LECTURA DE TEXTO


# class VocalTexto(forms.ModelForm):
#     class Meta:
#         model = VocalTexto
#         fields = '__all__'
