import { createContext, useContext, useState } from 'react';
import * as yup from 'yup';

const InstituicaoContext = createContext();

export function InstituicaoContextProvider({ children }) {
  let [instituicoes, setInstituicoes] = useState([]);

  let [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);

  const validationSchema = yup.object({
    NO_REGIAO: yup.string().matches(/^[A-Za-zÀ-ÿ\s]+$/, "Apenas letras").required("Região é obrigatória"),
    SG_UF: yup.string().matches(/^[A-Za-z]{2}$/, "UF deve ter 2 letras").required("Estado é obrigatório"),
    NO_MESORREGIAO: yup.string().required("Mesorregião é obrigatória"),
    NO_MICRORREGIAO: yup.string().required("Microrregião é obrigatória"),
    NO_MUNICIPIO: yup.string().matches(/^[A-Za-zÀ-ÿ\s]+$/, "Apenas letras").required("Município é obrigatório"),
    NO_ENTIDADE: yup.string().matches(/^[A-Za-zÀ-ÿ\s]+$/, "Apenas letras").required("Instituição é obrigatória"),
    QT_MAT_BAS: yup.number().typeError("Deve ser um número").positive("Deve ser positivo").required("Obrigatório"),
  });
  return (
    <InstituicaoContext.Provider
      value={{
        instituicoes,
        setInstituicoes,
        validationSchema,
        show,
        handleShow,
      }}
    >
      {children}
    </InstituicaoContext.Provider>
  );
}

export default function useInstituicao() {
  return useContext(InstituicaoContext);
}
