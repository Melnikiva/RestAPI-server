const readline = require('readline-sync');
const UserRepository = require('./repositories/userRepository');
const CompositionRepository = require('./repositories/compositionRepository');
const chalk = require('chalk');  // кольоровий текст в консолі
const User = require('./models/user');
const Composition = require('./models/composition');

while (true) {
    console.log();
    const input = readline.question("Enter command: ");
    const userRepository = new UserRepository('./data/users.json');
    const compositionRepository = new CompositionRepository('./data/compositions.json');
    const command = input.split("/");
    switch (command[0]) {
        case "get":
            {
                switch (command[1]) {
                    case "users":
                        {
                            if (typeof command[2] === 'undefined') {
                                const users = userRepository.getUsers();
                                for (const user of users) {
                                    console.log(chalk.yellow("id: ") + user.id
                                        + chalk.greenBright("\tlogin: ") + user.login
                                        + chalk.cyanBright("\tfullname: ") + user.fullname);
                                }
                            }
                            else if (isNumber(command[2])) {
                                const user = userRepository.getUserById(parseInt(command[2]));
                                if (user !== null)
                                    console.log(user);
                                else
                                    console.log(chalk.red(`User with id ${command[2]} not found!`));
                            }
                            else {
                                displayError();
                            }
                            break;
                        }
                    case "compositions":
                        {
                            if (typeof command[2] === 'undefined') {
                                const compositions = compositionRepository.getCompositions();
                                for (const composition of compositions) {
                                    console.log(chalk.yellow("id: ") + composition.id
                                        + chalk.greenBright("\ttitle: ") + composition.title);
                                }
                            }
                            else if (isNumber(command[2])) {
                                const composition = compositionRepository.getCompositionById(parseInt(command[2]));
                                if (composition !== null)
                                    console.log(composition);
                                else
                                    console.log(chalk.red(`Composition with id ${command[2]} not found!`));
                            }
                            break;
                        }
                    default:
                        {
                            displayError();
                            break;
                        }
                }
                break;
            }
        case "delete":
            {
                switch (command[1]) {
                    case "users":
                        {
                            if (isNumber(command[2])) {
                                if (checkUserId(userRepository, command[2]))
                                    userRepository.deleteUser(parseInt(command[2]));
                                else
                                    console.log(chalk.red(`User with id ${command[2]} not found!`));
                            }
                            else
                                displayError();
                            break;
                        }
                    case "compositions":
                        {
                            if (isNumber(command[2])) {
                                if (checkCompositionId(compositionRepository, command[2]))
                                    compositionRepository.deleteComposition(parseInt(command[2]));
                                else
                                    console.log(chalk.red(`Composition with id ${command[2]} not found!`));
                            }
                            else
                                displayError();
                            break;
                        }
                    default:
                        {
                            displayError();
                            break;
                        }
                }
                break;
            }
        case "update":
            {
                switch (command[1]) {
                    case "users":
                        {
                            if (isNumber(command[2])) {
                                const user = userRepository.getUserById(parseInt(command[2]));
                                if (user !== null) {
                                    const updated_user = getUpdatedUser(user);
                                    userRepository.updateUser(updated_user);
                                }
                                else
                                    console.log(chalk.red(`User with id ${command[2]} not found!`));
                            }
                            else
                                displayError();
                            break;
                        }
                    case "compositions":
                        {
                            if (isNumber(command[2])) {
                                const composition = compositionRepository.getCompositionById(parseInt(command[2]));
                                if (composition !== null) {
                                    const updated_composition = getUpdatedComposition(composition);
                                    compositionRepository.updateComposition(updated_composition);
                                }
                                else
                                    console.log(chalk.red(`Composition with id ${command[2]} not found!`));
                            }
                            else
                                displayError();
                            break;
                        }
                    default:
                        {
                            displayError();
                            break;
                        }
                }
                break;
            }
        case "post":
            {
                switch (command[1]) {
                    case "users":
                        {
                            const newUser = getNewUser();
                            userRepository.addUser(newUser);
                            break;
                        }
                    case "compositions":
                        {
                            const newComposition = getNewCompositon();
                            compositionRepository.addComposition(newComposition);
                            break;
                        }
                }
                break;
            }
        case "exit":
            {
                process.exit();
            }
        default:
            {
                displayError();
                break;
            }
    }

}

function checkUserId(userRepository, command) {
    let flag = false;
    const user = userRepository.getUserById(parseInt(command));
    if (user !== null)
        flag = true;
    return flag;
}

function checkCompositionId(compositionRepository, command) {
    let flag = false;
    const composition = compositionRepository.getCompositionById(parseInt(command));
    if (composition !== null)
        flag = true;
    return flag;
}

function displayError() {
    console.log(chalk.red("Invalid command! Try again."));
}

function isNumber(n) {
    const num = Number(n); // NaN
    return num === 0 || num;
}

function getUpdatedUser(user) {
    while (1) {
        const menu = ["Login", "Fullname", "Role", "Avatar url", "Is enabled"];
        const input = getOptionFromMenu(menu);
        if (isNumber(input)) {
            const option = parseInt(input);
            switch (option) {
                case 1:
                    {
                        user.login = readline.question("Input new login: ");
                        break;
                    }
                case 2:
                    {
                        user.fullname = readline.question("Input new fullname: ");
                        break;
                    }
                case 3:
                    {
                        const role = readline.question("Input new role: ");
                        if (role === '0' || role === '1') {
                            user.role = Number(role);
                            break;
                        }
                        else {
                            displayError();
                        }
                        break;
                    }
                case 4:
                    {
                        user.avaUrl = readline.question("Input new avarar url: ");
                        break;
                    }
                case 5:
                    {
                        while (1) {
                            const status = readline.question("Input new status (true or false): ");
                            if (status === 'true') {
                                user.isEnabled = true;
                                break;
                            }
                            else if (status === 'false') {
                                user.isEnabled = false;
                                break;
                            }
                            else
                                displayError();
                        }
                        break;
                    }
                default:
                    {
                        displayError();
                        break;
                    }
            }
            break;
        }
        else
            displayError();
    }

    return user;
}

function getUpdatedComposition(composition) {
    while (1) {
        const menu = ["Title", "Genre", "Rating"];
        const input = getOptionFromMenu(menu);
        if (isNumber(input)) {
            const option = parseInt(input);
            switch (option) {
                case 1:
                    {
                        composition.title = readline.question("Input new title: ");
                        break;
                    }
                case 2:
                    {
                        composition.genre = readline.question("Input new genre: ");
                        break;
                    }
                case 3:
                    {
                        const rating = readline.question("Input new rating: ");
                        if (isNumber(rating) && Number(rating) >= 0 && Number(rating) <= 100) {
                            composition.rating = Number(rating);
                            break;
                        }
                        else {
                            displayError();
                        }
                        break;
                    }
                default:
                    {
                        displayError();
                        break;
                    }
            }
            break;
        }
        else
            displayError();
    }

    return composition;
}

function getOptionFromMenu(menu) {
    menu.forEach((element, i) => {
        console.log((i + 1) + '. ' + element);
    });
    const input = readline.question("Input number: ");
    return input;
}

function getNewUser() {
    let user = new User;
    user.id = this.storage.nextId;
    user.registeredAt = new Date().toISOString();
    user.isEnabled = true;
    user.login = readline.question("Input login: ");
    user.fullname = readline.question("Input fullname: ");
    while (1) {
        const role = readline.question("Input role (1 or 0): ");
        if (role === '0' || role === '1') {
            user.role = Number(role);
            break;
        }
        else {
            displayError();
        }
    }
    user.avaUrl = readline.question("Input avatar url: ");
    return user;
}

function getNewCompositon() {
    let composition = new Composition;
    composition.id = this.storage.nextId;
    composition.title = readline.question("Input title: ");
    composition.genre = readline.question("Input genre: ");
    while (1) {
        const rating = readline.question("Input rating (from 0 to 100): ");
        if (isNumber(rating) && Number(rating) >= 0 && Number(rating) <= 100) {
            composition.rating = Number(rating);
            break;
        }
        else {
            displayError();
        }
    }
    return composition;
}