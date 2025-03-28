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
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { userProductStore } from "../store/product";
import { useDisclosure } from "@chakra-ui/react";

const ProductCard = ({ product }) => {
  const [editableProduct, setEditableProduct] = useState(product); // Renamed for clarity
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bg = useColorModeValue("white", "gray.800");
  const { deleteProduct, updateProduct } = userProductStore(); // Renamed `updatedProduct` to `updateProduct` for consistency
  const toast = useToast();

  // Handle product deletion
  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
  };

  // Handle product update
  const handleUpdateProduct = async () => {
    const { success, message } = await updateProduct(
      product._id,
      editableProduct
    );
    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
    if (success) onClose();
  };

  return (
    <Box
      shadow="md"
      rounded="md"
      overflow="hidden"
      transition="all 0.2s"
      _hover={{ transform: "translateY(-5px)", shadow: "2xl" }}
      bg={bg}
    >
      {/* Product Image */}
      <Image
        src={product.image}
        alt={product.name}
        height="12rem"
        width="100%"
        objectFit="cover"
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
          {product.name}
        </Heading>

        {/* Product Price */}
        <Text
          fontSize="xl"
          color="green.500"
          fontWeight="bold"
          mb={4}
          textTransform="uppercase"
        >
          LKR {product.price}
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
          New Arrival
        </Badge>

        {/* Action Buttons */}
        <HStack spacing={4}>
          <IconButton
            icon={<EditIcon />}
            colorScheme="blue"
            aria-label="Edit Product"
            onClick={onOpen}
          />
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => handleDeleteProduct(product._id)}
            colorScheme="red"
            aria-label="Delete Product"
          />
        </HStack>
      </Box>

      {/* Update Product Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
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
              Update
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
