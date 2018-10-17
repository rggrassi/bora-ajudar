import React from 'react';

let nome = null;
let descricao = null;
let subTitulo = null;
let comoDoar = null;
let meta = null;
let doado = null;

const handleSave = async (props) => {
    const campanha = {
        nome: nome.value,
        descricao: descricao.value,
        subTitulo: subTitulo.value,
        tipo: props.tipoCampanha,
        comoDoar: props.tipoCampanha === 'produtos' ? comoDoar.value : null,
        meta: props.tipoCampanha === 'doacao' ? meta.value : null,
        doado: props.tipoCampanha === 'doacao' ? doado.value : null,
    }
    await props.handleSave(campanha);
    nome.value = '';
    descricao.value = '';
    subTitulo.value = '';
    props.handleTipoDoacao('');
    if (comoDoar) {
        comoDoar.value = '';
    }
    if (meta) {
        meta.value = '';
    }
    if (doado) {
        doado.value = '';
    }

}

const AdminCampanhas = props => {
    return ( 
        <div>
            <h1>Campanhas</h1>
            <h2>Nova Campanha</h2>
            Campanha: <input type='text' ref={ref => nome = ref } /> <br />
            Sub-título: <input type='text' ref={ref => subTitulo = ref } /> <br />
            Descrição: <textarea ref={ref => descricao = ref } /> <br />
            Tipo: &nbsp; 
                <input type='radio' name='tipo' onClick={() => props.handleTipoDoacao('doacao') } /> Doação &nbsp;
                <input type='radio' name='tipo' onClick={() => props.handleTipoDoacao('produtos') } /> Produtos <br />

            { props.tipoCampanha === 'doacao' && <div>    
                <h4>Doação</h4>    
                Meta: <input type='text' ref={ref => meta = ref} /> <br />
                Doado: <input type='text' ref={ref => doado = ref} defaultValue={0}/>
            </div> }

            { props.tipoCampanha === 'produtos' && <div>    
                <h4>Produtos</h4>    
                Como doar: <input type='text' ref={ref => comoDoar = ref} />
            </div> }
            <button onClick={() => handleSave(props)}>Salvar</button>
            <ul>
                { Object
                    .keys(props.campanhas)
                    .map(key => renderCampanha(props, props.campanhas[key], key)) 
                }
            </ul>
        </div>
    )
}

const renderCampanha = (props, campanha, key) => {
    return (
        <li key={key}>
            {campanha.nome}
            &nbsp;
            <button>Editar</button>
            <button onClick={() => props.removeCampanha(key)}>Remover</button>
        </li>
    )
}

export default AdminCampanhas;