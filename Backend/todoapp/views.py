from django.shortcuts import render
from rest_framework.response import Response

from rest_framework.viewsets import ViewSet,ModelViewSet
from .serializers import TodoSer,UserSer
from .models import TodoModel


from rest_framework import authentication
from rest_framework import permissions
# Create your views here.


class SignUpViewSet(ViewSet):
    def create(self,request):
        ser=UserSer(data=request.data)
        if ser.is_valid():
            ser.save()
            return Response({"msg":"created"})        
        return Response({"msg":"Failed"})
    

class TodoViewset(ModelViewSet):
    serializer_class=TodoSer
    queryset=TodoModel.objects.all()
    authentication_classes=[authentication.TokenAuthentication]
    permission_classes=[permissions.IsAuthenticated]
    
    def create(self, request, *args, **kwargs):
        ser=TodoSer(data=request.data)
        # print(ser)
        if ser.is_valid():
            instance=ser.save(user=request.user)
            print(ser.data)
            return Response({"msg":"Todo added!","ob":ser.data})
        return Response({"msg":"Failed"})
    
    def get_queryset(self):
        return TodoModel.objects.filter(user=self.request.user)
    
    def destroy(self,request,*args,**kwargs):
        id=kwargs.get('pk')
        ob=TodoModel.objects.get(id=id)
        ob.delete()
        return Response({"msg":"deleted"})
    
