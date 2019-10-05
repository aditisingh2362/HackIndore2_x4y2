import numpy as np
from flask import Flask, request, jsonify
import pickle
import pandas as pd
from flask_cors import CORS

df = pd.read_csv('data.csv',index_col=False)
df.to_csv('data.csv',index=False)
df=df.drop("Sl no.",axis=1)
m=[]
import datetime

for st in df['Price Date']:
  string = st
  st = datetime.datetime.strptime(string, "%d %b %Y")
  m.append(st.month)
df['Month']=m
q=['Variety','Grade','Price Date']
df=df.drop(q,axis=1)

y=df['Commodity']
X=df.drop('Commodity',axis=1)





app = Flask(__name__)
model = pickle.load(open('model.pkl', 'rb'))
CORS(app)

@app.route('/')
def home():
    return render_template('index.html')

# @app.route('/predict',methods=['POST'])
# def predict():
#     '''
#     For rendering results on HTML GUI
#     '''
#     '''int_features = [x for x in request.form.values()]'''
# 	data = request.get_json()
# 	district = data['district']
# 	market = data['market']
# 	month = data['month']

#     final_features = [np.array(int_features)]
#     prediction = model.predict(final_features)

#     output = round(prediction[0], 2)

#     return render_template('index.html', prediction_text='Employee Salary should be $ {}'.format(output))

@app.route('/predict_api',methods=['POST'])
def predict_api():
    '''
    For direct API calls trought request
    '''

    data=request.get_json(force=True)
    print(data)
    d=data['district']
    mkt = data['market']
    mth = int(data['mth'])
    test= X[(X['District Name']==d) & (X['Market Name']==mkt) & (X['Month']==mth)]
    min_p=test['Min Price (Rs./Quintal)'].max()
    max_p=test['Max Price (Rs./Quintal)'].max()
    modal_p=test['Modal Price (Rs./Quintal)'].max()
    l=[[d,mkt,min_p,max_p,modal_p,mth]]
    l=pd.DataFrame(l,columns=['District Name', 'Market Name', 'Min Price (Rs./Quintal)','Max Price (Rs./Quintal)','Modal Price (Rs./Quintal)','Month'])
    prediction = model.predict(l)
    test2= df[(df['District Name']==d) & (df['Market Name']==mkt) & (df['Month']==mth) & (df['Commodity']==prediction[0])]
    modal_p2=test2['Modal Price (Rs./Quintal)'].max()
    output = prediction[0]

    # print(output)
    
    return jsonify(output, modal_p2), 200, {'Access-Control-Allow-Origin': "*"}

if __name__ == "__main__":
    app.run(debug=True)
