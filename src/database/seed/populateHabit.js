import Habit from "../models/habits.js"

const populateHabits = async (user_id) => {
    return await Habit.bulkCreate([
        {
            title: "Consulta na sexta",
            description: "Consulta para falar sobre dor nas costas com o Dr. Rafael",
            category: "Saúde",
            user_id
        },
        {
            title: "Tecnologias Atuais",
            description: "Estudar novas tecnologias nesse fim de semana",
            category: "Estudo",
            user_id
        },
        {
            title: "Faxina",
            description: "Preciso fazer uma fáxina geral nessa quarta",
            category: "Casa",
            user_id
        },
        {
            title: "DeadLine",
            description: "Preciso entregar a API até domingo a noite sobre habitos",
            category: "Trabalho",
            user_id
        },
        {
            title: "Colocar em dia minhas series",
            description: "Sobrando um tempo, irei assistir minhas series nesse fim de semana",
            category: "Lazer",
            user_id
        }
    ])

}

export default populateHabits