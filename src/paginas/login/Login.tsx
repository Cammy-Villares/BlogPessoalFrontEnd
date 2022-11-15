import { Grid, Box, Typography, TextField, Button } from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserLogin from '../../models/UserLogin';
import { login } from '../../services/Service';
import {addId, addToken} "../../store/tokens/actions"
import './Login.css';

function Login() {
    const [userLogin, setUserLogin] = useState<UserLogin>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: '',
        token: '',
    });
    const [respUserLogin, setRespUserLogin] = useState<UserLogin>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: '',
        token: '',
    });

    let history = useNavigate();

    const dispatch = useDispatch()

    const [token, setToken] = useState('')

    function updateModel(event: ChangeEvent<HTMLInputElement>) {
        setUserLogin({
            ...userLogin,
            [event.target.name]: event.target.value,
        });
    }

    async function logar(event: ChangeEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            await login('/usuarios/logar', userLogin, setRespUserLogin);
            toast.info('Usuário logado com sucesso', {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } catch (error) {
            alert('Dados de usuário incorretos');
        }
    }

    useEffect(() => {
        if (token !== '') {
            dispatch(addToken(token))
            history('/home');
        }
    }, [token]);

    useEffect(() => {
        if (respUserLogin.token !== '') {
            dispatch(addToken(respUserLogin.token))
            dispatch(addId(respUserLogin.id.toString()))
            history('/home')
        }
    }, [respUserLogin.token])

    return (
        <>
            <Grid container alignItems="center">
                <Grid item xs={6}>
                    <Box paddingX={20}>
                        <form onSubmit={logar}>
                            <Typography variant="h2" align="center">
                                Entrar
                            </Typography>
                            <TextField
                                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                    updateModel(event)
                                }
                                value={userLogin.usuario}
                                label="Usuário (e-mail)"
                                name="usuario"
                                id="usuario"
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                    updateModel(event)
                                }
                                value={userLogin.senha}
                                label="Senha"
                                name="senha"
                                type="password"
                                fullWidth
                                margin="normal"
                            />
                            <Box display="flex" justifyContent="center" marginY={2}>
                                <Button variant="contained" type="submit">
                                    Entrar
                                </Button>
                            </Box>
                        </form>
                        <Typography variant="body1" gutterBottom align="center" marginTop={2}>
                            Ainda não tem uma conta?
                            <Link to="/cadastro" className="linkCadastro">
                                Cadastre-se
                            </Link>
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={6} className="fundoLogin"></Grid>
            </Grid>
        </>
    );
}

export default Login;