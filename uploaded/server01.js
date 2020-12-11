//zmienne, stałe
const { strict } = require("assert")
const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const { WSAETOOMANYREFS } = require("constants")
const { stringify } = require("querystring")
const app = express()
var PORT = 3000

//funkcje serwera obsługujące konkretne adresy 
//nasłuch na określonym porcie
// app.use(express.static("static"))

var logged = true


direction = "up"

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})



app.get("/", function (req, res) {
    writeHtml(req, res)
    writeMenu(req, res)
    writeEnd(req, res)
    // res.sendFile(path.join(__dirname + "/static/main.html"))

})
app.get("/main", function (req, res) {
    writeHtml(req, res)
    writeMenu(req, res)
    writeEnd(req, res)

})
app.get("/register", function (req, res) {
    writeHtml(req, res)
    writeMenu(req, res)
    res.write("<form method=\"POST\" action=\"/sendRegister\">Login<input type=\"text\" name=\"login\"><br>    Hasło <input type=\"text\" name=\"password\"><br>    Wiek<input type=\"number\" name=\"age\"><br>    Uczeń?<input type=\"checkbox\" name=\"student\"><br>    płeć<br>    <input type=\"radio\" name=\"sex\" value=\"M\">M<br>    <input type=\"radio\" name=\"sex\" value=\"K\">K<br>    <input type=\"submit\" value=\"submit\"></form>")

    writeEnd(req, res)
})
app.get("/login", function (req, res) {
    writeHtml(req, res)
    writeMenu(req, res)
    res.write("<form method=\"POST\" action=\"/sendLogin\">Login<input type=\"text\" name=\"login\"><br>Hasło <input type=\"text\" name=\"password\"><br><input type=\"submit\" value=\"submit\"></form>")
    writeEnd(req, res)
})
app.get("/admin", function (req, res) {
    if (logged) {

        writeHtml(req, res)
        writeMenu(req, res)
        sortMenu(req, res)
        writeEnd(req, res)

    }
    else {
        writeHtml(req, res)
        writeMenu(req, res)
        res.write("no Access")
        writeEnd(req, res)

    }
})
app.get("/logout", function (req, res) {
    logged = false
    writeHtml(req, res)
    writeMenu(req, res)
    writeEnd(req, res)

})
app.get("/show", function (req, res) {
    if (logged) {

        writeHtml(req, res)
        sortMenu(req, res)

        // tableStyle(req, res)
        console.log(users.length)
        console.log(users[0])
        console.log(users[0].login)
        res.write("<table  style=\" border-collapse: collapse\">")

        for (i = 0; i < users.length; i++) {
            console.log(i)
            res.write("<tr>")
            res.write("<th style=\"border: 1px solid #000;\">")
            res.write("id: " + users[i].id)
            res.write("</th>")
            res.write("<th style=\"border: 1px solid #000;\">")
            res.write("user: " + users[i].login + " - " + users[i].password)
            res.write("</th>")
            res.write("<th style=\"border: 1px solid #000;\">")

            if (users[i].student == "on") {
                res.write("<label>Student</label><input type=\"checkbox\" checked disabled readonly>")

            }
            else {
                res.write("<label>Student</label><input type=\"checkbox\"  disabled readonly>")

            }
            res.write("</th>")

            res.write("<th style=\"border: 1px solid #000;\">")
            res.write("wiek: " + users[i].age)
            res.write("</th>")
            res.write("<th style=\"border: 1px solid #000;\">")
            res.write("płeć: " + users[i])
            res.write("</th>")
            res.write("</tr>")
            // console.log(users[0].student)
        }
        res.write("</table>")
        writeEnd(req, res)
    }
})
app.get("/sex", function (req, res) {
    if (logged) {
        writeHtml(req, res)
        sortMenu(req, res)
        res.write("<table  style=\" border-collapse: collapse\">")

        for (i = 0; i < users.length; i++) {
            if (users[i].sex == "M") {
                res.write("<tr>")

                res.write("<th style=\"border: 1px solid #000; position:relative; width=50%;\">")
                res.write("id: " + users[i].id)
                res.write("</th>")
                res.write("<th style=\"border: 1px solid #000; position:relative; width=50%;\">")
                res.write("płeć: " + users[i].sex)
                res.write("</tr>")

            }
        }
        res.write("</table> <br><br>")

        res.write("<table  style=\" border-collapse: collapse\">")

        for (i = 0; i < users.length; i++) {
            if (users[i].sex == "K") {
                res.write("<tr style=\"position:relative; width=100%;\">")

                res.write("<th style=\"border: 1px solid #000; position:relative; width=50%;\">")
                res.write("id: " + users[i].id)
                res.write("</th>")
                res.write("<th style=\"border: 1px solid #000; position:relative; width=50%;\">")
                res.write("płeć: " + users[i].sex)
                res.write("</tr>")


            }
        }
        res.write("</table>")
        writeEnd(req, res)
    }
})



// app.get("/sort", function (req, res) {
//     writeHtml(req, res)
//     sortMenu(req, res)
//     res.write("<br>")
//     SortMenu2(req, res)
//     console.log(req.query.aa)
//     if (req.quert.aa == "up") {
//         console.log("asdasdasdasd")
//     }
//     writeEnd(req, res)
// })

//_______________________________________________________________________________
var users = [
    { id: 1, login: "AAA", password: "PASS1", age: 10, uczen: "checked", sex: "M" },
    { id: 2, login: "a", password: "a", age: 123, uczen: undefined, sex: "M" },
    { id: 3, login: "b", password: "b", age: 32, uczen: "checked", sex: "M" },
    { id: 4, login: "c", password: "c", age: 11, uczen: undefined, sex: "K" },
    { id: 5, login: "d", password: "d", age: 8, uczen: "checke", sex: "K" },
]


app.use(bodyParser.urlencoded({ extended: true }));

app.post("/sendRegister", function (req, res) {
    id = users.length + 1
    login = (req.body.login)
    password = (req.body.password)
    age = (req.body.age)
    student = (req.body.student)
    sex = (req.body.sex)
    console.log(student)
    // woman = (req.body.woman)

    data = "<div> Witah " + login + ", twój email został dodany do bazy</div>"
    users.push({ id, login, password, age, student, sex })
    res.send(data)
    console.log(users)



    // }

})

app.post("/sendLogin", function (req, res) {
    login = (req.body.login)
    password = (req.body.password)
    if (users.map(a => a.login).includes(login)) {
        res.write("<html>");
        res.write("<body> Jesteś zalogowany </body>");
        res.write("</html>");
        console.log(users)
        logged = true


    }



})

app.get("/sort", function (req, res) {
    writeHtml(req, res)
    sortMenu(req, res)
    res.write("<br>")
    SortMenu2(req, res)
    res.write("<table  style=\" border-collapse: collapse\">")

    for (i = 0; i < users.length; i++) {
        console.log(i)
        res.write("<tr>")
        res.write("<th style=\"border: 1px solid #000;\">")
        res.write("id: " + users[i].id)
        res.write("</th>")
        res.write("<th style=\"border: 1px solid #000;\">")
        res.write("user: " + users[i].login + " - " + users[i].password)
        res.write("</th>")
        res.write("<th style=\"border: 1px solid #000;\">")

        if (users[i].student == "on") {
            res.write("<label>Student</label><input type=\"checkbox\" checked disabled readonly>")

        }
        else {
            res.write("<label>Student</label><input type=\"checkbox\"  disabled readonly>")

        }
        res.write("</th>")

        res.write("<th style=\"border: 1px solid #000;\">")
        res.write("wiek: " + users[i].age)
        res.write("</th>")
        res.write("<th style=\"border: 1px solid #000;\">")
        res.write("płeć: " + users[i].sex)
        res.write("</th>")
        res.write("</tr>")
        // console.log(users[0].student)
    }
    res.write("<table>")
    writeEnd(req, res)
})
app.post("/sort", function (req, res) {
    console.log(req.body.direction)
    if (req.body.direction == "up") {
        writeHtml(req, res)
        sortMenu(req, res)
        res.write("<br>")
        SortMenu2(req, res)
        res.write("<table  style=\" border-collapse: collapse\">")
        a = 200
        while (a > 0) {
            for (i = 0; i < users.length; i++) {
                if (users[i].age == a) {
                    console.log(i)
                    res.write("<tr>")
                    res.write("<th style=\"border: 1px solid #000;\">")
                    res.write("id: " + users[i].id)
                    res.write("</th>")
                    res.write("<th style=\"border: 1px solid #000;\">")
                    res.write("user: " + users[i].login + " - " + users[i].password)
                    res.write("</th>")
                    res.write("<th style=\"border: 1px solid #000;\">")

                    if (users[i].student == "on") {
                        res.write("<label>Student</label><input type=\"checkbox\" checked disabled readonly>")

                    }
                    else {
                        res.write("<label>Student</label><input type=\"checkbox\"  disabled readonly>")

                    }
                    res.write("</th>")

                    res.write("<th style=\"border: 1px solid #000;\">")
                    res.write("wiek: " + users[i].age)
                    res.write("</th>")
                    res.write("<th style=\"border: 1px solid #000;\">")
                    res.write("płeć: " + users[i].sex)
                    res.write("</th>")
                    res.write("</tr>")
                    // console.log(users[0].student)
                }
            }

            a--
        }


        res.write("<table>")
        writeEnd(req, res)
    }
    else {
        writeHtml(req, res)
        sortMenu(req, res)
        res.write("<br>")
        SortMenu2(req, res)
        res.write("<table  style=\" border-collapse: collapse\">")
        a = 0
        while (a < 200) {
            for (i = 0; i < users.length; i++) {
                if (users[i].age == a) {
                    console.log(i)
                    res.write("<tr>")
                    res.write("<th style=\"border: 1px solid #000;\">")
                    res.write("id: " + users[i].id)
                    res.write("</th>")
                    res.write("<th style=\"border: 1px solid #000;\">")
                    res.write("user: " + users[i].login + " - " + users[i].password)
                    res.write("</th>")
                    res.write("<th style=\"border: 1px solid #000;\">")

                    if (users[i].student == "on") {
                        res.write("<label>Student</label><input type=\"checkbox\" checked disabled readonly>")

                    }
                    else {
                        res.write("<label>Student</label><input type=\"checkbox\"  disabled readonly>")

                    }
                    res.write("</th>")

                    res.write("<th style=\"border: 1px solid #000;\">")
                    res.write("wiek: " + users[i].age)
                    res.write("</th>")
                    res.write("<th style=\"border: 1px solid #000;\">")
                    res.write("płeć: " + users[i].sex)
                    res.write("</th>")
                    res.write("</tr>")
                    // console.log(users[0].student)
                }
            }

            a++
        }


        res.write("<table>")
        writeEnd(req, res)
    }

})
function style(req, res) {
    res.write("<style><style>");


}


function writeMenu(req, res) {
    res.write("<a href=\" /main\">main </a>");
    res.write("<a href=\" /register\">register </a>");
    res.write("<a href=\" /login\">login </a>");
    res.write("<a href=\" /admin\">admin </a>");
    if (logged) {
        res.write("<a href=\" /logout\">logout </a>");
    }
}
function writeHtml(req, res) {
    // res.write("< !DOCTYPE html >");
    res.write("<html>");

    res.write("<head><meta charset=\"UTF-8\">");
    res.write("<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">");
    res.write("<title>Document</title></head>");


}
function writeEnd(req, res) {
    res.write("</body>");
    res.write("</html>");

}
function sortMenu(req, res) {
    res.write("<br><a href=\"/sort\">sort </a>")
    res.write("<a href=\"/sex\">sex </a>")
    res.write("<a href=\"/show\">show </a>")
}


function SortMenu2(req, res) {
    if (req.body.direction == "up") {
        res.write("<form method=\"POST\" action=\"/sort\" onchange=\"this.submit()\"><input type=\"radio\" name=\"direction\" value=\"up\" checked>rosnąco<input type=\"radio\" name=\"direction\" value=\"down\">down</form><br>")

    }
    else {
        res.write("<form method=\"POST\" action=\"/sort\" onchange=\"this.submit()\"><input type=\"radio\" name=\"direction\" value=\"up\">rosnąco<input type=\"radio\" name=\"direction\" value=\"down\" checked>down</form><br>")
    }
}
function style(req, res) {

}