import React, { useState } from 'react'
import styled from 'styled-components'

const ProdutoSelecionado = styled.main`
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin: 20px;

        img{
            border-radius: 10px;
            float: left;
        }
        .p{
            color: #89750c;
        }
        .margin-top{
            margin-top: 15px;
        }
        .img {
        width: auto;
        height: auto;
        position:relative;
        }
        .img button{
            border-radius: 50%;
            width: 50px;
            height: 50px;
            border: none;
        }
        .form{
            position: absolute;
            top: 0;
            right: 0;
            text-align: center;
        }
        label {
            float: left;
        }
        input {
            float: right;
        }
        @media(min-width: 1400px) {
            grid-area: main;
        }
`

export default props => {
    const [imgWidth, setImgWidth] = useState(window.innerWidth)

    window.addEventListener('resize', () => {
        setImgWidth(window.innerWidth)
    })

    return (
        <ProdutoSelecionado>
            {!props.produtosAdmin && !!props.produtos &&
                <>
                    {imgWidth < 351 &&
                        <img src={props.produtos.fotourl} alt='Foto produto' width='140' height='173' />
                    }
                    {imgWidth > 351 && imgWidth < 1400 &&
                        <img src={props.produtos.fotourl} alt='Foto produto' width='300' height='400' />
                    }
                    {imgWidth > 1400 &&
                        <img src={props.produtos.fotourl} alt='Foto produto' width='400' height='533' />
                    }
                    <div>
                        <h2>{props.produtos.nome}</h2>
                        <h3 className='margin-top'>{props.produtos.descriçao}</h3>
                        <p className='margin-top'>{props.produtos.tamanho}</p>
                        <p className='p'>{props.produtos.preço}</p>
                    </div>
                </>
            }

            {!!props.produtosAdmin &&
                <>
                    <div className='img'>
                        {imgWidth < 351 &&
                            <img src={props.produtosAdmin.fotourl} alt='Foto produto' width='140' height='173' />
                        }
                        {imgWidth > 351 && imgWidth < 1400 &&
                            <img src={props.produtosAdmin.fotourl} alt='Foto produto' width='300' height='400' />
                        }
                        {imgWidth > 1400 &&
                            <img src={props.produtosAdmin.fotourl} alt='Foto produto' width='400' height='533' />
                        }
                        <form className='form' action={process.env.URL_SERVER + '/admin/delete'} method='POST'>
                            <button type='submit'>X</button>
                            <input type="hidden" name="token" value={window.localStorage.getItem('authorization')} />
                            <input type='hidden' name='id' value={props.produtosAdmin._id} />
                        </form>
                    </div>
                    <div>
                        <h2>{props.produtosAdmin.nome}</h2>
                        <h3 className='margin-top'>{props.produtosAdmin.descriçao}</h3>
                        <p className='margin-top'>{props.produtosAdmin.tamanho}</p>
                        <p className='p'>{props.produtosAdmin.preço}</p><br />
                        <form action='https://catalogo-server.herokuapp.com/admin/update' method='POST'>
                            <label htmlFor='fotourl'>URL da foto:</label>
                            <input type='text' name='fotourl' /><br />
                            <label htmlFor='nome'>Nome:</label>
                            <input type='text' name='nome' /><br />
                            <label htmlFor='preço'>Preço:</label>
                            <input type='text' name='preço' /><br />
                            <label htmlFor='descriçao'>Descrição:</label>
                            <input type='text' name='descriçao' /><br />
                            <label htmlFor='tamanho'>Tamanho:</label>
                            <input type='text' name='tamanho' /><br />
                            <label htmlFor='tipo'>Categoria:</label>
                            <input type='text' name='tipo' /><br />
                            <input type="hidden" name="token" value={window.localStorage.getItem('authorization')} />
                            <input type='hidden' name='id' value={props.produtosAdmin._id} />
                            <button type='submit'>Editar</button>
                        </form>
                    </div>
                </>
            }
        </ProdutoSelecionado>
    )
}