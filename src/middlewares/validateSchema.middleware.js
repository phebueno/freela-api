export function schemaValidation(schema,field) {    
    return (req, res, next) => {
        const validation = schema.validate(req[field], { abortEarly: false })
        if (validation.error) {
            const erros = validation.error.details.map(d => d.message)
            return res.status(422).send(erros)
        }
        next()
    }
}