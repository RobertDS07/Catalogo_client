import React, { useState } from 'react'
import styled from 'styled-components'

const Sort = styled.div`
        height: 30px;
        width: 100%;
        .sort{
            float: right;
            border-radius: 10px;
            margin-right: 10px;
            background-color: white;
            cursor: pointer;
        }
        .left{
            float: left;
            margin-left: 10px;
        }
        p{
            margin: 8px;
            font-size: 10px;
            font-weight: bold;
        }
        p.bold{
            margin: 5px;
            font-size: 13px;
            font-weight: bolder;
        }
        .fixed{
            position: fixed;
            top: 10px;
            right: 10px;
        }
        .fixedRight{
            left: 10px;
            position: fixed;
            top: 10px;
        }
        #modal{
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.4);
            position: fixed;
            top:0;
            left: 0;
            display: flex;
            justify-content: flex-end;
            flex-direction: column;
        }
        .options{
            width: 100%;
            height: auto;
            text-align: left;
            background-color: white;
            z-index: 2;
        }
        .p{
            cursor: pointer;
            font-size: 20px;
            font-weight: 200;
            margin-top: 15px;
            margin-bottom: 10px
        }
        .strong{
            font-weight: bolder;
            margin-bottom: 10px;
        }
    @media(min-width: 501px){
        display: flex;
        justify-content: center;
        align-items: center;

        .sort.left{
            margin-right: 40%;
        }
        .fixed{
            right: 25%;
        }
        .fixedRight{
            left: 25%;
        }
        .options{
            text-align: center;
        }
    }
    @media(min-width: 1400px){
        grid-area: nav;
    }
`

// criei essa função simplesmente para poder tirar o eventListener do scroll pois estava dando erro quando o usuario mudava sua innerWidth 
function fixSort() {
    let sort = document.querySelectorAll('.sort')
    window.pageYOffset >= sort[0].offsetTop ? sort[0].classList.add('fixedRight') : sort[0].classList.remove('fixedRight')
    window.pageYOffset >= sort[0].offsetTop ? sort[1].classList.add('fixed') : sort[1].classList.remove('fixed')
}

window.addEventListener('load', () => {
    if (window.innerWidth < 1400) {
        window.addEventListener('scroll', fixSort)
    }
})
window.addEventListener('resize', () => {
    if (window.innerWidth < 1400) {
        window.addEventListener('scroll', fixSort)
    } else {
        window.removeEventListener('scroll', fixSort)
    }
})

export default props => {
    const [visible, setVisible] = useState(false)

    return (
        <Sort>
            <div className='sort left'>
                <p className='bold'>Tudo</p>
            </div>
            <div className='sort' onClick={() => setVisible(true)}>
                <p>Ordenar por</p>
            </div>
            {!!visible &&
                <div id='modal' onClick={() => setVisible(false)}>
                    <div className='options'>
                        <p className='p strong' onClick={() => props.setSort('tipo')}>Categorias</p>
                        <p className='p' onClick={() => props.setSort({ 'preço': 'asc' })}>Menor preço</p>
                        <p className='p' onClick={() => props.setSort({ 'preço': 'desc' })}>Maior preço</p>
                    </div>
                </div>
            }
        </Sort>
    )
}