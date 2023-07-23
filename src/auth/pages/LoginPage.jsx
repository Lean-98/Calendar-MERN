import { useEffect } from 'react';
import { useAuthStore, useForm } from '../../hooks';
import './LoginPage.css';
import Swal from 'sweetalert2';

 const loginFormFields = {
    loginEmail:     '',
    loginPassword:  '',
 }

 const registerFormFields = {
    registerName:     '',
    registerEmail:      '',
    registerPassword:   '',
    registerPassword2:  '',
 }


export const LoginPage = () => {

    const { startLogin, errorMessage, startRegister } = useAuthStore();

    const { loginEmail, loginPassword, onInputChange:onLoginInputChange } = useForm( loginFormFields );
    const { registerName, registerEmail, registerPassword, registerPassword2, onInputChange:onRegisterInputChange } = useForm( registerFormFields );

    const loginSubmit = ( e ) => {
        e.preventDefault();
        startLogin({ email: loginEmail, password: loginPassword });
    }

    const registerSubmit = ( e ) => {
        e.preventDefault();

        if( registerName.length <= 3 ) {
            Swal.fire('Error en Registro', 'El nombre debe tener más de 3 caracteres', 'error');
            return;
        }

        var expReg= /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        if( !expReg.test(registerEmail)) {
            Swal.fire('Error en Registro', 'E-mail no valido!', 'error');
            return;
        }

        if ( registerPassword.length < 6 && registerPassword2.length < 6 ) {
            Swal.fire('Error en Registro', 'Campo obligatorio las contraseñas deben tener 6 caracteres como mínimo', 'error');
            return;
        }

        if ( registerPassword !== registerPassword2 ) {
            Swal.fire('Error en Registro', 'Las Contraseñas no son iguales', 'error');
            return;
        }

        startRegister({ name: registerName, email: registerEmail, password: registerPassword });
    }
    
    useEffect(() => {
    if ( errorMessage !== undefined ) {
        Swal.fire('Error en la Autenticación', errorMessage, 'error');
    }
    }, [errorMessage])
    

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h2>CalendarApp</h2>
                    <form onSubmit={ loginSubmit }>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="example@outlook.us"
                                name="loginEmail"
                                value={ loginEmail }
                                onChange={ onLoginInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="loginPassword"
                                value={ loginPassword }
                                onChange={ onLoginInputChange }
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Iniciar Sesión" 
                            />
                        </div>
                        <span className='text-center'>¿Has olvidado la contraseña?</span>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h2>Registro</h2>
                    <form onSubmit={ registerSubmit }>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="registerName"
                                value={ registerName }
                                onChange={ onRegisterInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="E-mail"
                                name="registerEmail"
                                value={ registerEmail }
                                onChange={ onRegisterInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                name="registerPassword"
                                value={ registerPassword }
                                onChange={ onRegisterInputChange }
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name="registerPassword2"
                                value={ registerPassword2 }
                                onChange={ onRegisterInputChange }
                            />
                        </div>

                        <div className="d-grid gap-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}