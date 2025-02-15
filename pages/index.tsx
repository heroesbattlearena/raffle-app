import type { NextPage } from "next";
import { Box, Button, Container, Flex, Input, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { MediaRenderer, Web3Button, useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { HERO_IMAGE_URL, LOTTERY_CONTRACT_ADDRESS } from "../const/addresses";
import LotteryStatus from "../components/Status";
import { ethers } from "ethers";
import PrizeNFT from "../components/PrizeNFT";
import { useState } from "react";
import CurrentEntries from "../components/CurrentEntries";
import Link from "next/link";
import Head from "next/head";


const Home: NextPage = () => {
  const address = useAddress();

  const {
    contract
  } = useContract(LOTTERY_CONTRACT_ADDRESS);

  const {
    data: lotteryStatus
  } = useContractRead(contract, "lotteryStatus");

  const {
    data: ticketCost,
    isLoading: ticketCostLoading
  } = useContractRead(contract, "ticketCost");
  const ticketCostInEther = ticketCost ? ethers.utils.formatEther(ticketCost) : "0";

  const {
    data: totalEntries,
    isLoading: totalEntriesLoading
  } = useContractRead(contract, "totalEntries");

  const [ticketAmount, setTicketAmount] = useState(0);
  const ticketCostSubmit = parseFloat(ticketCostInEther) * ticketAmount;

  function increaseTicketAmount() {
    setTicketAmount(ticketAmount + 1);
  }

  function decreaseTicketAmount() {
    if (ticketAmount > 0) {
      setTicketAmount(ticketAmount - 1);
    }
  }

  return (
    <Container maxW={"1440px"}>
    <Head>
                <title>Heroes Battle Arena Raffle</title>
    </Head>
      <SimpleGrid columns={2} spacing={4} minH={"60vh"}>
        <Flex justifyContent={"center"} alignItems={"center"}>
          {lotteryStatus ? (
            <PrizeNFT/>
          ) : (
            <MediaRenderer
              src={HERO_IMAGE_URL}
              width="70%"
              height="70%"
            />
          )}
          
        </Flex>
        <Flex justifyContent={"center"} alignItems={"center"} p={"5%"}>
          <Stack spacing={10}>
            <Box>
              <Text fontSize={"xl"}>Heroes Battle Arena Raffle: Week 1 28.07 - 17.08 20:00 UTC</Text>
              <Text fontSize={"4xl"} fontWeight={"bold"}>Buy a ticket to win the NFT and Cash Prizes!</Text>
            </Box>
            
            <Text fontSize={"xl"}>Buy entries for a chance to win the NFT! The winner will be selected and transferred the NFT and a cash prize. The more entries the higher chance you have of winning the prize.</Text>

            <Box>
              <Link href={"https://zealy.io/c/heroesbattlearena"}>
                <Text fontSize={"xl"} fontWeight={"bold"}>Add your wallet in Zealy</Text>
              </Link>
            </Box>
            
            <LotteryStatus status={lotteryStatus}/>
            {!ticketCostLoading && (
              <Text fontSize={"2xl"} fontWeight={"bold"}>Cost Per Ticket: {ticketCostInEther} MATIC</Text>
            )}
            {address ? (
              <Flex flexDirection={"row"}>
                <Flex flexDirection={"row"} w={"25%"} mr={"40px"}>
                  <Button
                    onClick={decreaseTicketAmount}
                  >-</Button>
                  <Input
                    value={ticketAmount}
                    type={"number"}
                    onChange={(e) => setTicketAmount(parseInt(e.target.value))}
                    textAlign={"center"}
                    mx={2}
                  />
                  <Button
                    onClick={increaseTicketAmount}
                  >+</Button>
                </Flex>
                
                <Web3Button
                  contractAddress={LOTTERY_CONTRACT_ADDRESS}
                  action={(contract) => contract.call(
                    "buyTicket",
                    [
                      ticketAmount
                    ],
                    {
                      value: ethers.utils.parseEther(ticketCostSubmit.toString())
                    }
                  )}
                  isDisabled={!lotteryStatus}
                >{`Buy Ticket(s)`}</Web3Button>
              </Flex>
            ) : (
              <Text>Connect wallet to buy ticket.</Text>
            )}
            {!totalEntriesLoading && (
              <Text>Total Entries: {totalEntries.toString()}</Text>
            )}
          </Stack>
        </Flex>
      </SimpleGrid>
      <Stack mt={"40px"} textAlign={"center"}>
        <Text fontSize={"xl"}>Current Raffle Participants:</Text>
        <CurrentEntries/>
      </Stack>
      <Flex justifyContent={"center"} alignItems={"center"}>
        <Box>
          <Link href={"https://heroesbattlearena.online"}>
            <Text fontSize={"l"} fontWeight={"bold"}>2023 (c) Heroes Battle Arena</Text>
          </Link>
        </Box>
      </Flex>
    </Container>
  );
};

export default Home;
