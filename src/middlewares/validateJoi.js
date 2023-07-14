// essa pasta serve somente pra validade se o que a pessoa digiotou esta correto com o que foi solicitado
// essa pasta é solicitada em dentro da pasta Routes e usada no arquivo expecifico necessario


export function validateJoiGorAll(joi) {
    return (req, res, next) => {
        // verificar se passou nas validações do joi
        const validateIfItRight= joi.validate(req.body, { abortEarly: false });
        // o abortEarly serve pra procurar todos os requisitos que nao passou no joi
        if (validateIfItRight.error) {
            const specificError = validateIfItRight.error.details.map(box => box.message);
            return res.status(422).send(specificError);
        }
        next();
    }

}





