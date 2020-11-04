import Axios from 'axios'
import React, { useState, useEffect } from 'react'

import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import CatchInputsData from '../../../utils/catchInputsData'

import formatter from '../../../utils/formatter'
import showErrorFunction from '../../../utils/showErrorMsg'
import Loading from '../../utils/Loading'

const ProdutoSelecionado = styled.main`
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 20px;

    img {
        border-radius: 10px;
        float: left;
    }
    .p {
        color: #89750c;
    }
    .margin-top {
        margin-top: 15px;
    }
    .img {
        width: auto;
        height: auto;
        position: relative;
    }
    .form {
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
    .selectedProductWrapper {
        display: flex;
        flex-direction: column;
        position: relative;
    }
    .deleteProduct {
        position: absolute;
        border-radius: 50%;
        right: 0;
        cursor: pointer;
        outline: none;
        width: 50px;
        height: 50px;
        border: none;
    }
    @media (min-width: 1400px) {
        grid-area: main;
    }
`

export default (props) => {
    const [imgWidth, setImgWidth] = useState(window.innerWidth)
    const [product, setProduct] = useState()

    window.addEventListener('resize', () => {
        setImgWidth(window.innerWidth)
    })

    const updateProduct = async (e) => {
        e.preventDefault()

        const button = e.target.lastChild
        button.disabled = true

        const data = CatchInputsData(e)

        const dataArray = []

        for (const property in data) {
            if (property !== 'price') {
                dataArray.push(`${property}: "${data[property]}"`)
            } else {
                dataArray.push(`${property}: ${data[property]}`)
            }
        }

        try {
            const res = await Axios.post(
                process.env.REACT_APP_API || 'http://localhost:8081/graphql',
                {
                    query: `
                    mutation{
                        updateProduct(token:"${localStorage.getItem(
                            'authorization'
                        )}" storeName:"${props.storeName}" id:${
                        props.id
                    } data:{${dataArray.map((e) => e)}})
                    }
                    `,
                }
            )

            if (res.data.data.updateProduct) {
                showErrorFunction('Produto modoficado com sucesso', 'success')
                return props.setDeleted(true)
            }
        } catch (e) {
            button.disabled = false
            return showErrorFunction(e.response.data.errors[0].message)
        }
    }

    const deleteProduct = async () => {
        try {
            const res = await Axios.post(
                process.env.REACT_APP_API || 'http://localhost:8081/graphql',
                {
                    query: `
                    mutation{
                        deleteProduct(token:"${localStorage.getItem(
                            'authorization'
                        )}" storeName:"${props.storeName}" id:${props.id})
                    }
                    `,
                }
            )

            if (res.data.data.deleteProduct) {
                showErrorFunction('Produto deletado com sucesso', 'success')
                return props.setDeleted(true)
            }
        } catch (e) {
            return showErrorFunction(e.response.data.errors[0].message)
        }
    }

    useEffect(() => {
        ;(async () => {
            const res = await Axios.post(
                process.env.REACT_APP_API || 'http://localhost:8081/graphql',
                {
                    query: `
                {
                    getProduct(id:${props.id} storeName:"${props.storeName}"){
                        fotourl
                        name
                        price
                        size
                        description
                    }
                }
                `,
                }
            )
            setProduct(res.data.data.getProduct)
        })()
    }, [])

    return (
        <ProdutoSelecionado>
            {!product && <Loading />}

            {props.deleted && <Redirect to={`/${props.storeName}`} />}

            {!!product && (
                <div className="selectedProductWrapper">
                    {imgWidth < 351 && (
                        <img
                            src={product.fotourl}
                            alt="Foto produto"
                            width="140"
                            height="173"
                        />
                    )}
                    {imgWidth > 351 && imgWidth < 1400 && (
                        <img
                            src={product.fotourl}
                            alt="Foto produto"
                            width="300"
                            height="400"
                        />
                    )}
                    {imgWidth > 1400 && (
                        <img
                            src={product.fotourl}
                            alt="Foto produto"
                            width="400"
                            height="533"
                        />
                    )}
                    {props.admin && (
                        <button
                            type="button"
                            className="deleteProduct"
                            onClick={deleteProduct}
                        >
                            X
                        </button>
                    )}

                    <div>
                        <h2 style={{ textTransform: 'uppercase' }}>
                            {product.name}
                        </h2>
                        <h3 className="margin-top">{product.description}</h3>
                        <p
                            className="margin-top"
                            style={{ textTransform: 'uppercase' }}
                        >
                            {product.size}
                        </p>
                        <p className="p">{formatter.format(product.price)}</p>
                    </div>
                </div>
            )}

            {props.admin && (
                <form onSubmit={(e) => updateProduct(e)}>
                    <label htmlFor="fotourl">URL da foto:</label>
                    <input type="text" name="fotourl" />

                    <br />
                    <label htmlFor="name">Nome:</label>
                    <input type="text" name="name" />

                    <br />
                    <label htmlFor="price">Preço:</label>
                    <input type="number" name="price" id="price" step="any" />

                    <br />
                    <label htmlFor="description">Descrição:</label>
                    <input type="text" name="description" />

                    <br />
                    <label htmlFor="size">Tamanho:</label>
                    <input type="text" name="size" />

                    <br />
                    <label htmlFor="category">Categoria:</label>
                    <input type="text" name="category" />

                    <br />
                    <button type="submit">Editar</button>
                </form>
            )}
        </ProdutoSelecionado>
    )
}
