import os
from fastapi import FastAPI, Depends
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import Session
import sqlalchemy
from sqlalchemy.ext.declarative import declarative_base
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware




# Database configuration
DB_URL = "mysql+pymysql://gab:gabgab123!!!@localhost:3306/Exam"




# FastAPI app instance
app = FastAPI()


engine = create_engine(DB_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base() 

class Product(Base):
    __tablename__ = "productdetails"
    ProductID = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True, index=True)
    ProductName = sqlalchemy.Column(sqlalchemy.String)
    Category = sqlalchemy.Column(sqlalchemy.String)
    Description = sqlalchemy.Column(sqlalchemy.String)
    UnitPrice = sqlalchemy.Column(sqlalchemy.Double)
    StockQuantity = sqlalchemy.Column(sqlalchemy.Integer)

# Pydantic model for data validation
class ProductIn(BaseModel):
    ProductID: int 
    ProductName: str
    Category: str
    Description: str
    UnitPrice: float
    StockQuantity: int

# Dependency function to get database session
def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


@app.get("/")
def get_product(db: Session = Depends(get_db)):
    accounts = db.query(Product).all()
    return accounts


@app.post("/addproduct")
def add_product(product: ProductIn, db: Session = Depends(get_db)):
    new_product = Product(
        ProductID=product.ProductID,
        ProductName=product.ProductName,
        Category=product.Category,
        Description=product.Description,
        UnitPrice=product.UnitPrice,
        StockQuantity=product.StockQuantity
    )

    db.add(new_product)
    db.commit()
    db.refresh(new_product)  
    return {"message": "Product added successfully"}  

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development, allow all origins (restrict in production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)