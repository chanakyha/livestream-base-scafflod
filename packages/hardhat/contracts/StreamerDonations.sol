// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

/**
 * @title StreamerDonations
 * @dev Contract for managing donations to streamers on Base Sepolia
 */
contract StreamerDonations {
    // Struct to store streamer information
    struct Streamer {
        address payable wallet;
        uint256 balance;
        bool isRegistered;
    }
    
    // Mapping from streamer address to their information
    mapping(address => Streamer) public streamers;
    
    // Events
    event StreamerRegistered(address indexed streamerAddress);
    event DonationReceived(address indexed streamer, address indexed donor, uint256 amount);
    event PayoutProcessed(address indexed streamer, uint256 amount);
    
    // Errors
    error StreamerNotRegistered();
    error InsufficientBalance();
    error StreamerAlreadyRegistered();
    error InvalidAmount();
    
    /**
     * @dev Register a new streamer
     */
    function registerStreamer() external {
        if (streamers[msg.sender].isRegistered) {
            revert StreamerAlreadyRegistered();
        }
        
        streamers[msg.sender] = Streamer({
            wallet: payable(msg.sender),
            balance: 0,
            isRegistered: true
        });
        
        emit StreamerRegistered(msg.sender);
    }
    
    /**
     * @dev Donate to a streamer
     * @param streamerAddress The address of the streamer to donate to
     */
    function donate(address streamerAddress) external payable {
        if (!streamers[streamerAddress].isRegistered) {
            revert StreamerNotRegistered();
        }
        
        if (msg.value == 0) {
            revert InvalidAmount();
        }
        
        streamers[streamerAddress].balance += msg.value;
        
        emit DonationReceived(streamerAddress, msg.sender, msg.value);
    }
    
    /**
     * @dev Request a payout of accumulated donations
     */
    function requestPayout() external {
        if (!streamers[msg.sender].isRegistered) {
            revert StreamerNotRegistered();
        }
        
        uint256 amount = streamers[msg.sender].balance;
        if (amount == 0) {
            revert InsufficientBalance();
        }
        
        // Reset balance before transfer to prevent reentrancy
        streamers[msg.sender].balance = 0;
        
        // Transfer the funds to the streamer
        (bool success, ) = streamers[msg.sender].wallet.call{value: amount}("");
        require(success, "Transfer failed");
        
        emit PayoutProcessed(msg.sender, amount);
    }
    
    /**
     * @dev Get the current balance of a streamer
     * @param streamerAddress The address of the streamer
     * @return The current balance of the streamer
     */
    function getStreamerBalance(address streamerAddress) external view returns (uint256) {
        if (!streamers[streamerAddress].isRegistered) {
            revert StreamerNotRegistered();
        }
        return streamers[streamerAddress].balance;
    }
    
    /**
     * @dev Check if an address is a registered streamer
     * @param streamerAddress The address to check
     * @return True if the address is a registered streamer
     */
    function isStreamerRegistered(address streamerAddress) external view returns (bool) {
        return streamers[streamerAddress].isRegistered;
    }

    /**
     * @dev Get the pending payout balance for a streamer
     * @notice This function allows anyone to check how much a streamer can withdraw
     * @param streamerAddress The address of the streamer to check
     * @return pendingAmount The amount of donations available for payout
     */
    function getPendingPayoutBalance(address streamerAddress) external view returns (uint256 pendingAmount) {
        if (!streamers[streamerAddress].isRegistered) {
            revert StreamerNotRegistered();
        }
        return streamers[streamerAddress].balance;
    }
}