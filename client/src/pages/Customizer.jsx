import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";
import { Link } from "react-router-dom";

import config from "../config/config";
import state from "../store";
import { download } from "../assets";
import { downloadCanvasToImage, reader } from "../config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";
import { fadeAnimation, slideAnimation } from "../config/motion";
import {
  AIPicker,
  ColorPicker,
  CustomButton,
  FilePicker,
  Tab,
} from "../components";
import AddToCartButton from "../components/addcart";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Customizer = ({ cart, setCart }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [quantity, setQuantity] = useState(1);

  const snap = useSnapshot(state);
  const [price, setPrice] = useState(0);

  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);

  const [prompt, setPrompt] = useState("");
  const [generatingImg, setGeneratingImg] = useState(false);

  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const calculatePrice = () => {
    let price = 0;
    if (activeFilterTab.logoShirt && !activeFilterTab.stylishShirt) {
      price = price + 1000;
    }
    if (activeFilterTab.logoShirt && activeFilterTab.stylishShirt) {
      price = price + 1500;
    }

    return price;
  };

  const downloadCanvasToImageCart = () => {
    const canvas = document.querySelector("canvas");
    const dataURL = canvas.toDataURL();
    return dataURL;
  };

  const AddtoCart = () => {
    if (selectedOption === "") {
      toast.warn("Please select size of shirt", { position: "top-left" });
      return;
    }

    const imageData = downloadCanvasToImageCart();
    let price = calculatePrice();

    const obj = {
      title: "Half Sleeve Shirt",
      price: price,
      size: selectedOption,
      quantity: quantity,
      color: state.color,
      image: imageData,
    };

    setLoading(true);

    setCart((prevCart) => [...prevCart, obj]);

    handleClose();
    setQuantity(1);
    setPrice(0);
    setSelectedOption("");
    toast.success("Product Added To Cart", { position: "top-left" });
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    setLoading(false);
    console.log(cart);
  }, [cart]);

  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />;
      case "filepicker":
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
      case "aipicker":
        return (
          <AIPicker
            prompt={prompt}
            setPrompt={setPrompt}
            generatingImg={generatingImg}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  const handleSubmit = async (type) => {
    if (!prompt) return alert("Please enter a prompt");

    try {
      setGeneratingImg(true);

      const response = await fetch("http://localhost:8080/api/v1/dalle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      const data = await response.json();

      handleDecals(type, `data:image/png;base64,${data.photo}`);
    } catch (error) {
      alert(error);
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab("");
    }
  };

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];

    state[decalType.stateProperty] = result;

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];

        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }

    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName],
      };
    });
  };

  const readFile = (type) => {
    reader(file).then((result) => {
      handleDecals(type, result);
      setActiveEditorTab("");
    });
  };

  return (
    <AnimatePresence>
      {loading === true ? (
        <div>
          <CircularProgress />
        </div>
      ) : (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation("left")}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}

                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <Link to="/">
              <CustomButton
                type="filled"
                title="Go Back"
                handleClick={() => (state.intro = true)}
                customStyles="w-fit px-4 py-2.5 font-bold text-sm"
              />
            </Link>

            <br />

            <div>
              <button
                className="p-2 mt-3"
                style={{
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: "5px",
                }}
                onClick={handleOpen}
              >
                Add to Cart
              </button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Select Size & Quantity
                  </Typography>

                  <TextField
                    label="Quantity"
                    type="number"
                    value={quantity}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) => {
                      setQuantity(e.target.valueAsNumber);
                    }}
                    inputProps={{
                      min: 1, // Minimum value set to 0
                    }}
                    sx={{ marginTop: "15px", width: "40%" }}
                  />

                  <FormControl sx={{ marginTop: "15px" }}>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      value={selectedOption}
                      onChange={handleOptionChange}
                    >
                      <FormControlLabel
                        value="Large"
                        control={<Radio />}
                        label="Large"
                        required
                      />
                      <FormControlLabel
                        value="Medium"
                        control={<Radio />}
                        label="Medium"
                        required
                      />
                      <FormControlLabel
                        value="Small"
                        control={<Radio />}
                        label="Small"
                        required
                      />
                    </RadioGroup>

                    <Button
                      sx={{ marginTop: "25px" }}
                      variant="contained"
                      onClick={AddtoCart}
                    >
                      Save
                    </Button>
                  </FormControl>
                </Box>
              </Modal>
            </div>

            <Link to="/cart">
              <button
                className="p-2 mt-3"
                style={{
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: "5px",
                }}
              >
                Check Cart
              </button>
            </Link>
          </motion.div>

          <motion.div
            className="filtertabs-container"
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}

            <button className="download-btn" onClick={downloadCanvasToImage}>
              <img
                src={download}
                alt="download_image"
                className="w-3/5 h-3/5 object-contain"
              />
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
