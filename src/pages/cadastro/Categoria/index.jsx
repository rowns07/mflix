import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import { useForm } from '../../../hooks/useForm';
import repositoryCategories from '../../../repositories/categories';
import { Table } from './style';
import ButtonFlix from '../../../components/Button';

function CadastroCategoria() {
  const formData = {
    title: '',
    description: '',
    color: '',
    link_extra: {
      text: '',
      url: '',
    },
  };

  const { handleChange, values, clearForm } = useForm(formData);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    repositoryCategories.getAll()
      .then((success) => {
        setCategories(success);
      }).catch((error) => console.log(error));
  }, []);

  return (
    <PageDefault padding={50}>
      <div style={{ fontSize: 25 }}>
        <h1 className="title-page">
          Cadastro de Categoria:
        </h1>

        <form onSubmit={function handleSubmit(infosDoEvento) {
          infosDoEvento.preventDefault();
          setCategories([
            ...categories,
            values,
          ]);

          repositoryCategories.create({
            title: values.title,
            description: values.description,
            color: values.color,
            link_extra: {
              text: values.text,
              url: values.url,
            },
          })
            .then((success) => console.log('conteudo enviado', success));

          clearForm();
        }}
        >
          <FormField
            label="Nome da Categoria"
            type="text"
            value={values.title}
            name="title"
            onChange={handleChange}
          />

          <FormField
            label="Descrição"
            type="textarea"
            name="description"
            value={values.description}
            onChange={handleChange}
          />

          <FormField
            label="Cor"
            type="color"
            name="color"
            value={values.color}
            onChange={handleChange}
          />

          <FormField
            label="Link Extra Url"
            type="text"
            name="url"
            value={values.url}
            onChange={handleChange}
          />

          <FormField
            label="Link Extra Text"
            type="text"
            name="text"
            value={values.text}
            onChange={handleChange}
          />

          <ButtonFlix type="submit">
            Cadastrar
          </ButtonFlix>
          <ButtonFlix type="button" onClick={clearForm} style={{ marginLeft: 5, backgroundColor: 'white', color: 'black' }}>
            Limpar
          </ButtonFlix>

        </form>
        <br />
        <h3>Categorias Cadastradas:</h3>
        {categories.length === 0 && (<div>loading</div>)}

        <Table>
          <thead>
            <tr>
              <Table.Td>
                Titulo
              </Table.Td>
              <Table.Td>
                Descrição
              </Table.Td>
              <Table.Td>
                Opções
              </Table.Td>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (

              <tr key={category.id}>
                <Table.Td>{category.title}</Table.Td>
                <Table.Td>{category.link_extra.url}</Table.Td>
                <Table.Td>
                  <button
                    style={{
                      backgroundColor: 'red', color: 'white', borderColor: 'red', padding: '6rem', borderRadius: '4px',
                    }}
                    type="button"
                    onClick={function deleteCategory() {
                      repositoryCategories.deleteCategory(category.id)
                        .then((foi) => {
                          repositoryCategories.getAll()
                            .then((suc) => setCategories(suc));
                          console.log('REMOVEU MESMO TIO SE É LOUCO', foi);
                        })
                        .catch((erro) => {
                          console.log('DEU RUIM E NAO FOI POUCO', erro);
                        });
                    }}
                  >
                    apagar
                  </button>
                </Table.Td>
              </tr>
            ))}
          </tbody>
        </Table>

        <br />

        <Link to="/">
          <ButtonFlix>

            Ir para home
          </ButtonFlix>
        </Link>

      </div>
    </PageDefault>
  );
}

export default CadastroCategoria;
