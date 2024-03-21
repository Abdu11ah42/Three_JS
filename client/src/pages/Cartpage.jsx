import React from "react";
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
import { AnimatePresence, motion } from "framer-motion";
import { fadeAnimation, slideAnimation } from "../config/motion";
import { CustomButton } from "../components";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
/* import "../../public/cartpage.css"; */

const CartPage = ({ cart, removeFromCart }) => {
  return (
    <Container>
      <Typography variant="h4" component="h1" className="pt-3 text-center">
        Cart Page
      </Typography>
      <motion.div className="absolute z-10 top-5 right-5" {...fadeAnimation}>
        <Link to="/product">
          <CustomButton
            type="filled"
            title="Shirt Page"
            handleClick={() => (state.intro = true)}
            customStyles="w-fit px-4 py-2.5 font-bold text-sm"
          />
        </Link>
      </motion.div>

      {cart.length === 0 ? (
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
                toast.success("Your Order Has Been Placed", {
                  position: "top-left",
                });
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
