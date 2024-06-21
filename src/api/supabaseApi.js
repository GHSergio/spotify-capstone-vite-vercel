import { supabase } from "../supabaseClient";

// 插入測試數據
export const addTestData = async () => {
  try {
    const { data, error } = await supabase.from("categoryEmoji").insert([
      { id: 1, emoji: "💤" },
      { id: 2, emoji: "😴" },
    ]);
    if (error) {
      throw error;
    }
    // console.log("Test data inserted:", data);
    return { success: true, data: data };
  } catch (error) {
    console.error("插入測試數據失敗:", error);
    return {
      success: false,
      message: error.message || "Error connecting to server",
    };
  }
};

// 獲取 categoryEmoji
export const getCategoryEmoji = async () => {
  try {
    const { data, error, status } = await supabase
      .from("categoryEmoji")
      .select("*");
    if (error) {
      console.error("Error fetching categoryEmoji:", error);
      throw error;
    }
    // console.log("Fetched categoryEmoji data:", data);
    localStorage.setItem("categoryEmojiData", JSON.stringify(data));
    return { success: true, data: data };
  } catch (error) {
    console.error("獲取清單表情時發生錯誤:", error);
    return {
      success: false,
      message: error.message || "Error connecting to server",
    };
  }
};
// 新增 categoryEmoji
export const addCategoryEmoji = async (categoryId, newEmoji) => {
  try {
    const { data, error } = await supabase
      .from("categoryEmoji")
      .insert([{ id: categoryId, emoji: newEmoji }])
      .select(); // 添加 .select() 確保返回插入的數據

    if (error) {
      console.error("Error adding categoryEmoji:", error);
      throw error;
    }
    // 從 localStorage 中獲取現有的 categoryEmoji
    const categoryEmojiData =
      JSON.parse(localStorage.getItem("categoryEmojiData")) || [];
    // 添加新的項目
    categoryEmojiData.push({ id: categoryId, emoji: newEmoji });
    // 更新 localStorage
    localStorage.setItem(
      "categoryEmojiData",
      JSON.stringify(categoryEmojiData)
    );
    return { success: true, data: data };
  } catch (error) {
    console.error("新增 emoji 失敗:", error);
    return {
      success: false,
      message: error.message || "Error connecting to server",
    };
  }
};

// 修改 categoryEmoji
export const editCategoryEmoji = async (categoryId, newEmoji) => {
  try {
    const { data, error } = await supabase
      .from("categoryEmoji")
      .update({ emoji: newEmoji })
      .eq("id", categoryId)
      .select();
    if (error) {
      console.error("Error editing categoryEmoji:", error);
      throw error;
    }
    // 從 localStorage 中獲取現有的 categoryEmoji
    const categoryEmojiData =
      JSON.parse(localStorage.getItem("categoryEmojiData")) || [];
    // 更新相應的項目
    const updatedCategoryEmojiData = categoryEmojiData.map((item) =>
      item.id === categoryId ? { ...item, emoji: newEmoji } : item
    );
    // 更新 localStorage
    localStorage.setItem(
      "categoryEmojiData",
      JSON.stringify(updatedCategoryEmojiData)
    );
    return { success: true, data: data };
  } catch (error) {
    console.error("更新 emoji 失敗:", error);
    return {
      success: false,
      message: error.message || "Error connecting to server",
    };
  }
};

// 刪除 categoryEmoji
export const deleteCategoryEmoji = async (categoryId) => {
  try {
    const { data, error } = await supabase
      .from("categoryEmoji")
      .delete()
      .eq("id", categoryId);
    if (error) {
      console.error("Error deleting categoryEmoji:", error);
      throw error;
    }
    // 從 localStorage 中獲取現有的 categoryEmoji
    const categoryEmojiData =
      JSON.parse(localStorage.getItem("categoryEmojiData")) || [];
    // 移除相應的項目
    const updatedCategoryEmojiData = categoryEmojiData.filter(
      (item) => item.id !== categoryId
    );
    // 更新 localStorage
    localStorage.setItem(
      "categoryEmojiData",
      JSON.stringify(updatedCategoryEmojiData)
    );
    return { success: true, data: data };
  } catch (error) {
    console.error("刪除 emoji 失敗:", error);
    return {
      success: false,
      message: error.message || "Error connecting to server",
    };
  }
};
