import React from 'react'
import styled from 'styled-components'

const DevInput = styled.section`
    max-width: 200px;
    min-height: 300px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
`

export default ({ storeName, createFunction, inputs }) => {
    return (
        <DevInput>
            <form onSubmit={(e) => createFunction(e)}>
                <label htmlFor="storeName">storeName</label>
                <input
                    type="text"
                    name="storeNameToLink"
                    id="storeNameToLink"
                    value={storeName}
                    readOnly
                />

                <label htmlFor="auth">Auth</label>
                <input type="password" name="auth" id="auth" />

                {!!inputs &&
                    inputs.map((e) => (
                        <>
                            <label htmlFor={e}>{e}</label>
                            <input type="text" name={e} id={e} />
                        </>
                    ))}

                <input type="submit" value="Criar" />
            </form>
        </DevInput>
    )
}
