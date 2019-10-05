# Importing the libraries
import pandas as pd

df = pd.read_csv('data.csv',index_col=False)
df.to_csv('data.csv',index=False)

import pickle

import matplotlib as plt
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
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.33, random_state=42)
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OneHotEncoder
from sklearn.ensemble import RandomForestClassifier

numerical_cols=['Min Price (Rs./Quintal)','Max Price (Rs./Quintal)','Modal Price (Rs./Quintal)','Month']
categorical_cols=['District Name','Market Name']

# Preprocessing for numerical data
numerical_transformer= SimpleImputer(strategy='constant')

# Preprocessing for categorical data
categorical_transformer=Pipeline(steps=[
	('imputer',SimpleImputer(strategy='most_frequent')),
	('onehot',OneHotEncoder(handle_unknown='ignore'))
])

# Bundle preprocessing for numerical and categorical data
preprocessor=ColumnTransformer(transformers=[
	('num',numerical_transformer,numerical_cols),
	('cat',categorical_transformer,categorical_cols)
])

model=RandomForestClassifier(n_estimators=100,random_state=0)

# Bundle preprocessing and modeling code in a pipeline
mypipeline=Pipeline(steps=[
	('preprocessor',preprocessor),
	('model',model)
])

# Preprocessing of training data, fit model 
mypipeline.fit(X,y)


# Saving model to disk
pickle.dump(mypipeline, open('model.pkl','wb'))

d='Mainpuri'
mkt='Mainpuri'
mth=7

test= X[(X['District Name']==d) & (X['Market Name']==mkt) & (X['Month']==mth)]
min_p=test['Min Price (Rs./Quintal)'].max()
max_p=test['Max Price (Rs./Quintal)'].max()
modal_p=test['Modal Price (Rs./Quintal)'].max()

l=[[d,mkt,min_p,max_p,modal_p,mth]]
l=pd.DataFrame(l,columns=['District Name', 'Market Name', 'Min Price (Rs./Quintal)','Max Price (Rs./Quintal)','Modal Price (Rs./Quintal)','Month'])


# Loading model to compare the results
model = pickle.load(open('model.pkl','rb'))
print(model.predict(l))
