import User from "../models/User.js";

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch (error) {
        return res.status(400).json({ Error: error.message})
    }
}

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params; 
        const user = await User.findById({id})

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        )
        
        const formattedfriends = await friends.map(({ _id, firstName, lastName, location, occupation, picturePath}) => {
            return {  _id, firstName, lastName, location, occupation, picturePath }
        })
        res.status(200).json(formattedfriends);
    } catch (error) {
        return res.status(400).json({ Error: error.message})
    }
}

export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if(user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId)
            friend.friends = friend.friends.filter((id) => id !== id)
        } else {
            user.friends.push(friendId)
            friend.friends.push(id)
        }

        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        )
        
        const formattedfriends = await friends.map(({ _id, firstName, lastName, location, occupation, picturePath}) => {
            return {  _id, firstName, lastName, location, occupation, picturePath }
        })
        res.status(200).json(formattedfriends);


    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}