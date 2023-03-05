# vismem
This is graph memorize tool.
you can create network graph for memoring relation objects each other.

like this:
![image](https://user-images.githubusercontent.com/100256521/219835376-460beaf9-6ab6-4e5b-a113-f3bd8116fcc5.png)

click "save_button":
![image](https://user-images.githubusercontent.com/100256521/219837075-4aefea08-24c7-4bc7-87af-14f64051f3e2.png)

this is graph data(on src/graph_memo/views.py)

## download

```
git clone git@github.com:weweweok/vismem.git 
```

This repositry is not perfect.
Because not being created database for saving graph data　etc... .


## run server 
Open tarminal and write "python manage.py runserver" On vismem/src after clone this repository. 

```
python manage.py runserver
```

URL: http://127.0.0.1:8000/graph_memo/

you can create graph and post to server.(check your opening tarminal)

## create data base
On usually munipulating data base,You have to make migration file.
But You don't have to make now. I created. You only write "python manage.py migrate graph_memo 0001" in tarminal.
```
python manage.py migrate graph_memo 0001
```
you will find file "db.dbsqlite3".You can save graph_data.
