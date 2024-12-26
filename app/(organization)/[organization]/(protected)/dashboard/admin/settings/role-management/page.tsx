"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Pencil, Trash2, Shield, UserMinus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface Permission {
  id: string;
  name: string;
  description: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

interface Staff {
  id: string;
  name: string;
  email: string;
  role: string;
}

const permissions: Permission[] = [
  { id: "1", name: "view_dashboard", description: "View Dashboard" },
  { id: "2", name: "manage_events", description: "Manage Events" },
  { id: "3", name: "manage_customers", description: "Manage Customers" },
  { id: "4", name: "manage_inventory", description: "Manage Inventory" },
  { id: "5", name: "manage_roles", description: "Manage Roles" },
];

const roleSchema = z.object({
  name: z.string().min(2, "Role name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  permissions: z.array(z.string()).min(1, "Select at least one permission"),
});

type RoleFormValues = z.infer<typeof roleSchema>;

export default function RoleManagementPage() {
  const [roles, setRoles] = useState<Role[]>([
    {
      id: "1",
      name: "Admin",
      description: "Full access to all features",
      permissions: ["1", "2", "3", "4", "5"],
    },
    {
      id: "2",
      name: "Event Manager",
      description: "Manage events and related tasks",
      permissions: ["1", "2"],
    },
    {
      id: "3",
      name: "Inventory Manager",
      description: "Manage inventory and stock",
      permissions: ["1", "4"],
    },
  ]);
  const [staff, setStaff] = useState<Staff[]>([
    { id: "1", name: "John Doe", email: "john@example.com", role: "1" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", role: "2" },
    { id: "3", name: "Bob Johnson", email: "bob@example.com", role: "3" },
  ]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  const form = useForm<RoleFormValues>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: "",
      description: "",
      permissions: [],
    },
  });

  const onSubmit = (data: RoleFormValues) => {
    if (editingRole) {
      setRoles(
        roles.map((role) =>
          role.id === editingRole.id ? { ...editingRole, ...data } : role
        )
      );
      setEditingRole(null);
    } else {
      const newRole: Role = {
        ...data,
        id: Date.now().toString(),
      };
      setRoles([...roles, newRole]);
    }
    setIsFormOpen(false);
    form.reset();
  };

  const handleDeleteRole = (id: string) => {
    setRoles(roles.filter((role) => role.id !== id));
    setStaff(staff.map((s) => (s.role === id ? { ...s, role: "" } : s)));
  };

  const handleAssignRole = (staffId: string, roleId: string) => {
    setStaff(staff.map((s) => (s.id === staffId ? { ...s, role: roleId } : s)));
  };

  const handleRevokeRole = (staffId: string) => {
    setStaff(staff.map((s) => (s.id === staffId ? { ...s, role: "" } : s)));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-3xl font-bold mb-4 sm:mb-0">Role Management</h1>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingRole(null);
                form.reset();
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Role
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editingRole ? "Edit Role" : "Add Role"}
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter role name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter role description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="permissions"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">Permissions</FormLabel>
                        <FormDescription>
                          Select the permissions for this role.
                        </FormDescription>
                      </div>
                      <ScrollArea className="h-[200px] rounded-md border p-4">
                        {permissions.map((permission) => (
                          <FormField
                            key={permission.id}
                            control={form.control}
                            name="permissions"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={permission.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(
                                        permission.id
                                      )}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              permission.id,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) =>
                                                  value !== permission.id
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {permission.description}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </ScrollArea>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">
                  {editingRole ? "Update Role" : "Add Role"}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {roles.map((role) => (
          <Card key={role.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Shield className="mr-2 h-4 w-4" />
                  {role.name}
                </span>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditingRole(role);
                      form.reset({
                        name: role.name,
                        description: role.description,
                        permissions: role.permissions,
                      });
                      setIsFormOpen(true);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteRole(role.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
              <CardDescription>{role.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <Tabs defaultValue="permissions">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="permissions">Permissions</TabsTrigger>
                  <TabsTrigger value="users">Users</TabsTrigger>
                </TabsList>
                <TabsContent value="permissions" className="mt-4">
                  <ScrollArea className="h-[150px]">
                    <div className="space-y-2">
                      {permissions.map((permission) => (
                        <div key={permission.id} className="flex items-center">
                          {role.permissions.includes(permission.id) ? (
                            <Badge variant="secondary" className="mr-2">
                              {permission.description}
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="mr-2">
                              {permission.description}
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="users" className="mt-4">
                  <ScrollArea className="h-[150px]">
                    <div className="space-y-2">
                      {staff
                        .filter((s) => s.role === role.id)
                        .map((staffMember) => (
                          <div
                            key={staffMember.id}
                            className="flex items-center justify-between"
                          >
                            <span>{staffMember.name}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRevokeRole(staffMember.id)}
                            >
                              <UserMinus className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      <Select
                        onValueChange={(value) =>
                          handleAssignRole(value, role.id)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Assign user to role" />
                        </SelectTrigger>
                        <SelectContent>
                          {staff
                            .filter((s) => s.role !== role.id)
                            .map((staffMember) => (
                              <SelectItem
                                key={staffMember.id}
                                value={staffMember.id}
                              >
                                {staffMember.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                {role.permissions.length} permission
                {role.permissions.length !== 1 ? "s" : ""} assigned
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
