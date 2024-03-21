import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  Typography,
  Container,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CustomButton } from "../components";
import { toast } from "react-toastify";
import "../../public/cartpage.css";

const CartPage = ({ cart, removeFromCart }) => {
  const [isPlaced, setIsPlaced] = useState(false);

  return (
    <Container>
      <Typography variant="h4" component="h1" className="pt-3 text-center">
        Cart Page
      </Typography>
      <div className="absolute z-10 top-5 right-5">
        <Link to="/product">
          <CustomButton
            type="filled"
            title="Shirt Page"
            handleClick={() => (state.intro = true)} // Not sure what this line does, need clarification
            customStyles="w-fit px-4 py-2.5 font-bold text-sm"
          />
        </Link>
      </div>

      {isPlaced ? (
        <div className="card mt-20">
          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              borderRadius: "200px",
              height: "200px",
              width: "200px",
              background: "#F8FAF5",
            }}
          >
            <i className="checkmark">✓</i>
          </div>
          <h1>Success</h1>
          <p>Your Order has been Placed !</p>
        </div>
      ) : cart.length === 0 ? (
        <Typography variant="body1" className="text-center pt-20" gutterBottom>
          Nothing to show
        </Typography>
      ) : (
        <div className="container pt-10 pb-5">
          <TableContainer
            component={Paper}
            style={{ maxHeight: 550, overflowY: "auto" }}
          >
            <Table aria-label="cart">
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{
                      width: 150,
                      position: "sticky",
                      top: 0,
                      zIndex: 1,
                      background: "white",
                    }}
                  >
                    Image
                  </TableCell>
                  <TableCell
                    style={{
                      position: "sticky",
                      top: 0,
                      zIndex: 1,
                      background: "white",
                    }}
                  >
                    Title
                  </TableCell>
                  <TableCell
                    style={{
                      position: "sticky",
                      top: 0,
                      zIndex: 1,
                      background: "white",
                    }}
                  >
                    Size
                  </TableCell>
                  <TableCell
                    style={{
                      position: "sticky",
                      top: 0,
                      zIndex: 1,
                      background: "white",
                    }}
                  >
                    Price
                  </TableCell>
                  <TableCell
                    style={{
                      position: "sticky",
                      top: 0,
                      zIndex: 1,
                      background: "white",
                    }}
                  >
                    Color
                  </TableCell>
                  <TableCell
                    style={{
                      position: "sticky",
                      top: 0,
                      zIndex: 1,
                      background: "white",
                    }}
                  >
                    Quantity
                  </TableCell>
                  <TableCell
                    style={{
                      position: "sticky",
                      top: 0,
                      zIndex: 1,
                      background: "white",
                    }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <img
                        src={item.image}
                        alt="product_image"
                        style={{ width: 100, height: 100 }}
                      />
                    </TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.size}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>{item.color}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="delete"
                        onClick={() => removeFromCart(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <div className="mt-3 text-right">
            <Button
              variant="contained"
              onClick={() => {
                setIsPlaced(true);
                removeFromCart("all");
              }}
            >
              Place Order
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default CartPage;
