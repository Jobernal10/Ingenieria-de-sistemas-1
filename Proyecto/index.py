from flask import Flask, render_template
#from flask_mysqldb import MySQL

app = Flask(__name__) #Nuestra aplicacion
#app.config['MYSQL_HOST'] = 'localhost'
#mysql = MySQL()

"""
@app.route('/') #Ruta raiz
def principal():
    return "Pero mira que aspero" #MSJ de prueba

@app.route('/contacto')
def contacto():
    return "Contactanos"
"""

#Rutas las que quiera

@app.route('/')
def principal():
    return render_template('index.html') #llamando a la ruta HTML


@app.route('/categorias')
def categorias():
    return render_template('categorias.html')

if __name__ == '__main__': #Verlo en navegador
    app.run(debug=True,port=8080) #Guardado automatico