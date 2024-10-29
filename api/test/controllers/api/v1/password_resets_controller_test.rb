require "test_helper"

class Api::V1::PasswordResetsControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get api_v1_password_resets_new_url
    assert_response :success
  end

  test "should get create" do
    get api_v1_password_resets_create_url
    assert_response :success
  end
end
