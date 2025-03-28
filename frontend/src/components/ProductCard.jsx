// Import necessary modules and components from Chakra UI and React
import {
  Box,
  Heading,
  HStack,
  IconButton,
  useColorModeValue,
  Text,
  useToast,
  Image,
  Badge,
  VStack,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons"; // Icons for edit and delete actions
import { userProductStore } from "../store/product"; // Zustand store for managing product state
import { useDisclosure } from "@chakra-ui/react"; // For managing modal visibility

// ProductCard component to display individual product details
const ProductCard = ({ product }) => {
  // State to manage editable product details
  const [editableProduct, setEditableProduct] = useState(product);

  // Chakra UI hook for modal visibility
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Chakra UI hook for determining color mode (light or dark)
  const bg = useColorModeValue("white", "gray.800");

  // Zustand store functions for deleting and updating products
  const { deleteProduct, updateProduct } = userProductStore();

  // Chakra UI hook for displaying toast notifications
  const toast = useToast();

  // Function to format price in LKR currency with two decimal places
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "LKR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
      .format(price)
      .replace("LKR", "LKR "); // Ensure space after "LKR"
  };

  // Function to handle product deletion
  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid); // Call deleteProduct from Zustand store
    toast({
      title: success ? "Success" : "Error", // Show success or error message
      description: message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
  };

  // Function to handle product update
  const handleUpdateProduct = async () => {
    const { success, message } = await updateProduct(
      product._id,
      editableProduct
    ); // Call updateProduct from Zustand store
    toast({
      title: success ? "Success" : "Error", // Show success or error message
      description: message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
    if (success) onClose(); // Close modal on successful update
  };

  return (
    <Box
      shadow="md"
      rounded="md"
      overflow="hidden"
      position="relative" // Enable absolute positioning for child elements
      transition="all 0.2s"
      _hover={{ transform: "translateY(-5px)", shadow: "2xl" }} // Add hover effect
      bg={bg}
    >
      {/* Action Buttons (Edit and Delete) */}
      <HStack
        spacing={2}
        position="absolute" // Position buttons absolutely
        bottom={2} // Align to the bottom
        right={2} // Align to the right
        zIndex={1} // Ensure buttons are above other elements
      >
        <IconButton
          icon={<EditIcon />} // Edit icon
          colorScheme="blue"
          aria-label="Edit Product"
          onClick={onOpen} // Open modal for editing
        />
        <IconButton
          icon={<DeleteIcon />} // Delete icon
          onClick={() => handleDeleteProduct(product._id)} // Call delete handler
          colorScheme="red"
          aria-label="Delete Product"
        />
      </HStack>

      {/* Product Image */}
      <Image
        src={product.image} // Product image URL
        alt={product.name} // Alt text for accessibility
        height="12rem"
        width="100%"
        objectFit="cover" // Ensure image covers the container
      />

      {/* Product Details */}
      <Box p={6}>
        {/* Product Name */}
        <Heading
          as="h3"
          size="md"
          mb={2}
          color="blue.500"
          fontWeight="bold"
          textTransform="capitalize"
        >
          {product.name} {/* Display product name */}
        </Heading>

        {/* Product Price */}
        <Text
          fontSize="xl"
          color="green.500"
          fontWeight="bold"
          mb={4}
          textTransform="uppercase"
        >
          {formatPrice(product.price)} {/* Display formatted price */}
        </Text>

        {/* Product Badge */}
        <Badge
          colorScheme="purple"
          fontSize="0.8em"
          px={2}
          py={1}
          rounded="full"
          mb={4}
        >
          New Arrival {/* Display badge */}
        </Badge>
      </Box>

      {/* Update Product Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              {/* Input for product name */}
              <Input
                placeholder="Product Name"
                name="name"
                value={editableProduct.name}
                onChange={(e) =>
                  setEditableProduct({
                    ...editableProduct,
                    name: e.target.value,
                  })
                }
              />
              {/* Input for product price */}
              <Input
                placeholder="Product Price"
                name="price"
                value={editableProduct.price}
                onChange={(e) =>
                  setEditableProduct({
                    ...editableProduct,
                    price: e.target.value,
                  })
                }
              />
              {/* Input for product image URL */}
              <Input
                placeholder="Product Image URL"
                name="image"
                value={editableProduct.image}
                onChange={(e) =>
                  setEditableProduct({
                    ...editableProduct,
                    image: e.target.value,
                  })
                }
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpdateProduct}>
              Update {/* Button to update product */}
            </Button>
            <Button onClick={onClose}>
              Cancel {/* Button to cancel update */}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
