import { TestBed, getTestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { mockUser } from '../test/mocks';

describe('UserService', () => {

  // tambien podriamos utilizar el inject()
  let injector:TestBed

  //Simular solicitudes HTTP
  let httpMock:HttpTestingController 

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ]
    })

    //Tener acceso a las variables limpias antes de cada it()
    injector = getTestBed()
    httpMock = injector.get(HttpTestingController)
  });

  afterEach(()=>{

    //Verificamos que no haya solicitudes pendientes
    httpMock.verify()
  })

  it('Debe ser creado', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  it('Debe retornar un Observable<User[]>', ()=>{

    //Instanciamos nuestro servicio
    const service:UserService = TestBed.get(UserService)

    //Nos suscribimos al metodo getAll()
    service.getAll().subscribe((users)=>{
      expect(users.length).toBe(2)
      expect(users).toEqual(mockUser)
      expect(users[0].login).toBeDefined()
    })


    //Validamos la url de nuestra API
    const req = httpMock.expectOne('https://api.github.com/users')
    expect(req.request.method).toBe('GET') //Validamos que sea un metodo GET
    req.flush(mockUser) //Proporcionar valores ficticios como respuesta de nuestras peticiones
  })

});
