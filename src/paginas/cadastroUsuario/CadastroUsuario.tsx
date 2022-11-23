import { Box, Button, Grid, TextField } from '@mui/material';
import React, { ChangeEvent, useState, useEffect } from 'react';
import './CadastroUsuario.css';
import { Typography } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import User from '../../models/User';
import {cadastroUsuario} from '../../services/Service';

function CadastroUsuario() {
  let navigate = useNavigate();

 
  const [confirmarSenha, setConfirmarSenha] = useState<string>('');

 
  function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value);
  }


  const [user, setUser] = useState<User>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: '',
  });


  const [userResult, setUserResult] = useState<User>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: '',
  });

  function updateModel(event: ChangeEvent<HTMLInputElement>) {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  }

  async function cadastrar(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

  
    if (confirmarSenha === user.senha && user.senha.length >= 3) {
     
      try {
        await cadastroUsuario('/usuarios/cadastrar', user, setUserResult);
        alert('Usuário cadastrado com sucesso'); 
      } catch (error) {
        alert('Falha interna ao cadastrar'); 
      }
    } else {
     
      alert('As senhas não conferem. Favor verificar novamente');

      setUser({ ...user, senha: '' }); 
      setConfirmarSenha(''); 
    }
  }

 
  useEffect(() => {
    if (userResult.id !== 0) {
      navigate('/login');
    }
  }, [userResult]);
    
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
        <Grid item xs={6} className='imagem2'></Grid>
        <Grid item xs={6} alignItems="center">
        <Box paddingX={10}>
        <form onSubmit={cadastrar} >
                        <Typography variant="h3" gutterBottom color="textPrimary" component="h3" align="center" className="textos2">Cadastrar</Typography>
                        <TextField id="nome" label="nome" variant="outlined" name="nome" margin="normal" fullWidth />
                        <TextField id="usuario" label="usuario" variant="outlined" name="usuario" margin="normal"  fullWidth />
                        <TextField id="senha" label="senha" variant="outlined" name="senha" margin="normal" type='password' fullWidth />
                        <TextField id="Confirmarsenha" label="Confirmarsenha" variant="outlined" name="Confirmarsenha" margin="normal" type="password" fullWidth />
                        <Box marginTop={2} textAlign="center">
                            <Link to= "/login"  className='text-decorator-none'>
                            <Button  variant="contained" color="secondary" className='btnCancelar'>
                                Cancelar
                            </Button>
                            </Link>
                            <Button type="submit"  variant="contained" color="primary">
                                Cadastrar
                            </Button>
                        </Box>
                    </form> 
        
        
        </Box>
</Grid>

    </Grid>
  )
}

export default CadastroUsuario